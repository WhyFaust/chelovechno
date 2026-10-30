# Development

[Русский](development.md) | English

Run these commands from the repository root.

## Checks and build

Development requires Node.js 22 or later, with no dependencies to install:

```bash
node --test scripts/prepare.test.mjs scripts/release-version.test.mjs
node scripts/prepare.mjs
```

The tests exercise valid and broken build inputs and release version selection. The build checks structure, local links and completeness of both editions, then creates `dist/chelovechno.md` and `dist/chelovechno_en.md`. GitHub Actions runs the same checks. They verify packaging, not a "humanity score." Behavioral changes are reviewed using the scenarios in `evals/`.

`skills/chelovechno/` is the source for the installable skill and both portable prompts. `dist/` contains generated files; `.cache/` is for temporary checks. Both directories are ignored by Git. Behavioral cases and reports live in [evals/](../evals/README_en.md).

## Releases

After `main` passes validation, GitHub Actions selects the next version from commit messages since the latest release, following [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/):

| Commits | Version bump |
|---|---|
| `fix:`, `perf:` | patch: `0.4.0` → `0.4.1` |
| `feat:` | minor: `0.4.0` → `0.5.0` |
| `!` before `:` or a `BREAKING CHANGE:` / `BREAKING-CHANGE:` footer | major: `0.4.0` → `1.0.0` |
| `docs:`, `test:`, `chore:`, `ci:`, `build:`, `style:`, `refactor:` without a breaking change | No release |

The highest bump across all new commits wins. Scopes are supported: `fix(parser): ...`. A regular merge includes the commits inside the PR; a squash merge needs the appropriate final commit title.

The workflow updates `metadata.version` in `SKILL.md` and `SKILL_en.md`, validates the build, commits the version to `main` and publishes a `vX.Y.Z` tag, a ZIP of the skill folder and both portable Markdown files. No manual version edits are needed. Retrying does not bump the version again. To resume an unfinished publication, run the "Check skill" workflow manually on `main`; if a release draft remains, finish or delete it before retrying.

