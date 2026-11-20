# Repository hygiene

- Before a handoff or commit, review untracked files with `git status --short --untracked-files=all`. Add narrowly scoped `.gitignore` rules for local QA output, dated UX re-audits, build output, caches, dependency folders, logs, and local configuration or secrets.
- Keep application source, dependency manifests and lockfiles, build configuration, shared documentation, and assets used by the published portfolio in Git. Check references before ignoring a file that could be used by the site or build.
- Use `git check-ignore -v` to confirm each new rule matches its intended files. Review `git ls-files --others --exclude-standard` to confirm new source and site assets are eligible to commit.
