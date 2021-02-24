<p align="center">
  <a href="https://github.com/actions/typescript-action/actions"><img alt="typescript-action status" src="https://github.com/actions/typescript-action/workflows/build-test/badge.svg"></a>
</p>

# Github Action to delete comments by username

Delete-comment Action will delete comments from issue/pr by username.

## Sample Workflows Triggered Manually

```yaml
name: delete comments from open-collective-bot
on:
  workflow_dispatch:
jobs:
  delete-comments:
    runs-on: ubuntu-latest
    steps:
      - uses: izhangzhihao/delete-comment@master
        with: 
          github_token: ${{ secrets.GITHUB_TOKEN }}
          delete_user_name: open-collective-bot[bot]
```