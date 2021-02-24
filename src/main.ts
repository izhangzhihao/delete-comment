import * as core from '@actions/core'
import * as github from '@actions/github'

async function run(): Promise<void> {
  console.log(
    `startting process for ${github.context.repo.owner}/${github.context.repo.repo}`
  )
  try {
    const token: string = core.getInput('github_token')
    const userName: string = core.getInput('delete_user_name')

    const octokit = github.getOctokit(token)

    const issues = await octokit.paginate(octokit.issues.list, {
      owner: github.context.repo.owner,
      repo: github.context.repo.repo
    })

    for (const issue of issues) {
      const resp = await octokit.issues.listComments({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        issue_number: issue.number
      })

      const comments = resp.data.filter(it => it.user?.login === userName)

      for (const comment of comments) {
        console.log(
          `Processing issue ${comment.issue_url} user: ${comment.user} comment: ${comment.body_text}`
        )

        await octokit.request(
          'DELETE /repos/{owner}/{repo}/issues/comments/{comment_id}',
          {
            owner: github.context.repo.owner,
            repo: github.context.repo.repo,
            comment_id: comment.id
          }
        )
      }
    }
  } catch (error) {
    console.error(`Error happend: ${error.message}`)
    core.setFailed(error.message)
  }
}

run()
