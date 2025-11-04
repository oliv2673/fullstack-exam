# GitHub CLI Workflow: Issues, Branches, and Pull Requests

This document shows a concise, practical workflow using the GitHub CLI (`gh`) and `git` for common tasks:
1. Install `gh`
2. Create an issue
3. View the issue list and create a branch to solve an issue
4. Push your branch and create a PR via `gh`
5. Edit or delete a PR you submitted earlier

Prerequisites
- git installed and configured (user.name, user.email).
- A GitHub account and permission to push/create PRs in the target repository.
- `gh` installed and authenticated (see step 1).

---

## 1) Install gh

macOS (Homebrew)
```bash
brew install gh
```

Windows (winget)
```powershell
winget install --id GitHub.cli
```

Linux (deb-based)
```bash
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | \
  sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
sudo apt-add-repository https://cli.github.com/packages
sudo apt update
sudo apt install gh
```

Authenticate
```bash
gh auth login
# Follow the interactive prompts to authenticate (web or token).
```

Verify
```bash
gh version
gh auth status
```

---

## 2) Create an issue

From the repo directory (or specify `--repo owner/repo`):

Create an issue with a title and body:
```bash
gh issue create --title "grid not responsive" --body "Grid breaks at small viewports; needs responsive CSS adjustments." --assignee @me
```

Open the issue in the browser:
```bash
gh issue view --web <issue-number>
```

List your recent issues:
```bash
gh issue list --state open --author @me
```

---

## 3) View the issue list and create a branch which solves the issue

Find the issue (by search or list):
```bash
# Search by text
gh issue list --search "grid not responsive" --state all

# Or list all open issues
gh issue list --state open
```

When you have the issue number (e.g., `#123`), create a feature branch that references it:
```bash
git checkout -b fix/grid-not-responsive-123
```

Make changes locally, then stage/commit:
```bash
git add .
git commit -m "Fix grid responsiveness — closes #123"
```

Notes:
- Including "closes #123" in the commit message will automatically close the referenced issue when the PR is merged.
- If you work from a fork, ensure your remote (`origin`) points to your fork.

---

## 4) Push the branch and create a PR via gh CLI

Push the branch to the remote (and set upstream):
```bash
git push -u origin fix/grid-not-responsive-123
```

Create the PR with title, body, labels, and reviewers:
```bash
gh pr create --base main \
             --head fix/grid-not-responsive-123 \
             --title "Fix: grid not responsive" \
             --body "Fix layout to be responsive on small screens. Closes #123." \
             --label "enhancement" \
             --assignee @me
```

Create a draft PR if not ready for review:
```bash
gh pr create --draft --title "WIP: grid fix" --body "Work in progress"
```

Open the PR in the browser:
```bash
gh pr view --web
# or for a specific PR:
gh pr view 123 --web
```

Merge the PR (if allowed and ready):
```bash
# Merge with a merge commit
gh pr merge 123 --merge --delete-branch --body "Merges fix for grid responsiveness."

# Or squash and merge
gh pr merge 123 --squash --delete-branch
```

Notes:
- Branch protection rules and required reviewers may prevent merging even after approvals.
- Use `gh pr checks <pr>` or `gh pr view <pr> --json commits,checks` to inspect CI/check status.

---

## 5) Edit or delete a PR you submitted earlier

Identify the PR you want to edit:
```bash
gh pr list --state open
# or search
gh pr list --author @me --search "grid"
```

Edit the PR title/body/labels/assignees:
```bash
# Edit title and body
gh pr edit 123 --title "Fix: responsive grid layout" --body "Updated description with details and screenshots."

# Add a label
gh pr edit 123 --add-label "enhancement"

# Remove a label
gh pr edit 123 --remove-label "WIP"

# Change the base branch (if allowed)
gh pr edit 123 --base develop
```

Check out the PR branch locally to add more commits:
```bash
gh pr checkout 123
# make changes...
git commit -am "Address reviewer feedback"
git push
```

Approve or request changes (review your own PR or others'):
```bash
gh pr review 123 --approve --body "LGTM"
gh pr review 123 --request-changes --body "Please address ... "
```

Close (without merging) or reopen a PR:
```bash
gh pr close 123 --delete-branch   # closes PR, optionally deletes branch
gh pr reopen 123
```

Delete the branch from the remote (if you didn't use --delete-branch with merge):
```bash
git push origin --delete fix/grid-not-responsive-123
```

Notes on permissions:
- You need appropriate repository permissions to edit labels, change base, or delete branches.
- You can edit PRs you created; maintainers may have broader privileges.

---

Appendix — Helpful commands

- View a PR fully in JSON:
```bash
gh pr view 123 --json number,title,state,body,labels,assignees,reviewRequests,commits
```

- List labels in the repo:
```bash
gh label list
```

- Create a label:
```bash
gh label create "enhancement" --color ff7f0e --description "New or improved feature"
```

- Quickly re-run tests or check status:
```bash
gh run list --workflow "CI"
gh run view <run-id> --web
```

---

End of workflow
