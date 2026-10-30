# Chelovechno

[Русский](README.md) | English

An AI-agent skill for authored writing with a clear point and a natural voice: posts, articles, emails, scripts, descriptions, titles, comments and replies. Write from scratch, edit a draft, adapt material or find a fresh topic.

Russian is the default; other languages are available on request. Tone and form follow the task and audience. The skill runs in your model and environment, without its own server, API key or subscription. Fresh topics require search or a browser.

## Quick start

Install with [Skills CLI](https://skills.sh/docs):

```bash
npx skills add WhyFaust/chelovechno --skill chelovechno
```

Choose your agent in the installer and give it a task. For example, in Codex:

```text
$chelovechno Write a useful English Telegram post about choosing a first notebook.
Blank pages suit drawing; dots help align writing.
Keep it calm, with no sales pitch or invented personal experience. Return only the post.
```

For a regular chat, download **chelovechno.md** or **chelovechno_en.md** from the [latest release](https://github.com/WhyFaust/chelovechno/releases/latest). For manual installation, copy the entire `skills/chelovechno/` folder.

See [installation details, English instructions and sample requests](docs/usage_en.md).

## What to ask for

| Task | What to provide |
|---|---|
| Write | Subject, audience, facts and intended use |
| Edit | Draft and details to preserve |
| Adapt | Source material and the desired form: post, email, description or speech |
| Reply in a discussion | Original post, relevant reply, later updates and your position |
| Find a fresh topic | Subject, search period and audience |
| Match your voice | Writing samples, without transferring stories or biography |

By default, the agent returns one finished result. It preserves prices, deadlines, qualifications and the supplied way to order. An ordinary explanation gets no unsolicited sales pitch. New writing uses straight double quotes `"..."`; exact quotations stay intact. Material gaps prompt one clarifying question.

Read the [teaching examples](examples/texts_en.md) and a [live research example, in Russian](evals/reports/live-search.md). Quality depends on the model and material; the skill does not promise audience reach or AI-detector results.

## Project layout

| Path | Contents |
|---|---|
| [skills/chelovechno/](skills/chelovechno/SKILL_en.md) | Installable skill, RU/EN instructions, references and metadata |
| [docs/usage_en.md](docs/usage_en.md) | Installation, requests, research and writing |
| [docs/development_en.md](docs/development_en.md) | Build, checks and releases |
| [docs/sources_en.md](docs/sources_en.md) | Sources and limits of their application |
| [examples/](examples/texts_en.md) | Russian and English teaching examples |
| [evals/](evals/README_en.md) | Cases, evaluation protocol and saved reports |
| [scripts/](scripts/prepare.mjs) | Portable builds and release version selection |

[Agent Reach](docs/agent-reach_en.md) is an optional add-on; the base installation works without it.

## Checks and build

From the repository root, with Node.js 22 or later and no dependencies to install:

```bash
node --test scripts/prepare.test.mjs scripts/release-version.test.mjs
node scripts/prepare.mjs
```

The build creates `dist/chelovechno.md` and `dist/chelovechno_en.md`. Automated tests check packaging and release behavior; model behavior is evaluated separately with the [cases](evals/README_en.md).

## License

[MIT](LICENSE). External sources retain their own licenses and authorship.
