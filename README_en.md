# Chelovechno

[Русский](README.md) | English

An agent skill for authored prose with a clear point and a natural voice: posts, articles, emails, scripts, descriptions, titles, comments and replies to comments. Write from scratch, edit a draft, adapt existing material or find a fresh topic.

Russian is the default; other languages are available on request. Tone and form follow the task and audience. Supply your own writing samples to guide rhythm, vocabulary and manner.

```text
$chelovechno Find a fresh story about urban photography from the last three days
and write an English Telegram post for beginning photographers.
Keep it plain and specific, without promotional language or invented personal experience.
Show sources separately from the post.
```

The skill runs in your model and environment. It has no server, API key or subscription of its own. Fresh topics require search or browser access in the host agent.

## Install

For an agent supporting [Agent Skills](https://agentskills.io):

```bash
npx skills add WhyFaust/chelovechno --skill chelovechno
```

The installer offers an agent selection. For a user-level Codex installation:

```bash
npx skills add WhyFaust/chelovechno --skill chelovechno --agent codex --global
```

Replace `codex` with `claude-code` for Claude Code, or `cursor` for Cursor. For every agent supported by the installer:

```bash
npx skills add WhyFaust/chelovechno --skill chelovechno --agent '*' --global
```

These commands use [Skills CLI](https://skills.sh/docs) and require Node.js with npm. Manual installation does not require Node.js.

### Manually

Download the repository and copy the **entire** `skills/chelovechno` folder, including `references/` and `agents/`:

| Environment | User folder | Project folder |
|---|---|---|
| Codex | `~/.agents/skills/chelovechno/` | `.agents/skills/chelovechno/` |
| Claude Code | `~/.claude/skills/chelovechno/` | `.claude/skills/chelovechno/` |

On Windows, `~` is the user directory, usually `C:\Users\name`. For another environment, use its documented skill directory. Preserve local changes before replacing an existing skill.

Discovery and invocation depend on the agent: `$chelovechno` in Codex, `/chelovechno` in Claude Code, or an ordinary writing request when automatic selection is supported. Codex usually discovers skill changes automatically; restart the environment if it does not appear. See the [Codex documentation](https://learn.chatgpt.com/docs/build-skills) and [Claude Code documentation](https://code.claude.com/docs/en/skills).

### English instructions

The default `SKILL.md` is Russian. [SKILL_en.md](skills/chelovechno/SKILL_en.md) and references ending in `_en.md` provide the English edition. After copying the folder manually, replace the contents of `SKILL.md` with `SKILL_en.md`. To translate the optional Codex display metadata too, replace `agents/openai.yaml` with `agents/openai_en.yaml`.

Install one edition under the same name, `chelovechno`. Instruction language does not set output language: Russian remains the default in both editions. Ask explicitly for English or another language when needed.

### In a regular chat or your own system

Download **chelovechno_en.md** from the [latest release](https://github.com/WhyFaust/chelovechno/releases/latest). It combines the English instructions and references in one file. Attach it to a chat or use it as an instruction in your own system, then give the task. **chelovechno.md** is the Russian edition. To build both locally, run `node scripts/prepare.mjs`.

A single file is useful where folder-based skills cannot be installed. It does not supply a browser. Without search, the agent can work from your material but should not invent fresh news. Whether attached Markdown becomes an instruction depends on the host chat.

## What to ask

The skill has no fixed platform modes. It prioritizes the requested deliverable, conversation context and intended use. A video description and spoken script should differ even when both are for YouTube. A new platform does not need a new handbook.

With enough context, the agent writes immediately. If "for YouTube" could mean a script, description or title, it asks one question with choices. Required components of one deliverable, such as a post's title and body, are included unless you request only one field.

**Photo captions**

```text
Write three English Instagram captions. The photo shows an empty beach after rain.
Short and calm, without grand reflections. Do not invent a travel story.
```

**Video description**

```text
Write an English description for a YouTube video showing how to make a notebook:
choosing paper, stitching pages and attaching a cover. For beginners.
No invented timestamps, links or extra content package.
```

**Fresh topic to finished post**

```text
Find a fresh story about recreational running and write an English Telegram post.
For people who run for themselves. Search the last three days.
Explain why it matters to them. Put sources outside the post.
```

**Spoken words**

```text
Now write the introduction to that video in English. I'll read it on camera.
Only my spoken words, without a description or editing directions.
```

**Your voice**

```text
Here are some of my texts: [samples]. Use their rhythm and tone.
Write a new English article about [topic] for [audience], using [facts].
Do not transfer anecdotes or biography from the samples.
```

**Business email**

```text
Write an English email to our partner Anna. We plan to send the design on November 12.
If approval takes longer, we'll notify her separately about a revised date.
Ask whether the plan works. Calm and businesslike, without an invented signature.
```

**Comments and replies**

```text
Write an English comment on this post: [post]. I want to support the author
without invented "I've been there too" stories or unsolicited advice.
```

```text
Help me reply in English to this comment: [comment]. Original post: [post].
Later clarifications: [if any]. My stance: [what I want to say].
Calm and specific. Return only the reply.
```

The agent distinguishes a comment on a post from a reply to a particular person. It accounts for the parent comment and later updates rather than repeat advice already tried. A thank-you can stay short; disagreement addresses the claim; brand replies do not invent refunds, dates or completed actions.

**Edit**

```text
Make this draft sound more natural. Preserve prices, dates, links and qualifications.
Return only the finished text in English: [draft].
```

By default, the agent returns one finished result. Your requested count, length and structure take priority. Material gaps prompt one question with choices; established context is not asked for again. Articles and detailed analysis are not compressed into short posts.

Exact field limits and publishing restrictions are checked when relevant. Community rules and the difference between a standalone post and a reply also matter. A few public examples do not define everyone's voice on a platform.

## Research

When a task needs current information, the agent searches, opens the material and verifies key claims first. For fresh topics, the default window is the last **72 hours** relative to execution time. For slow topics, it may widen to seven days and disclose it. Your explicit period takes priority. Historical and explanatory research is not constrained by this news window.

The agent distinguishes publication and event dates, seeks primary sources, and does not count reposts as independent confirmation. An ordinary announcement can be supported by its author; disputed conclusions need further evidence. An old launch described in a new article does not become a new development.

A separate author note follows the result, with verification time, period, sources actually read and material limitations. Spoken text names sources naturally while service links stay outside the script. If verification fails, the agent says so and offers to use supplied material or another topic.

Research starts with your request. Scheduled monitoring and automatic publishing need host capabilities and separate setup.

### Optional: Agent Reach

[Agent Reach](https://github.com/Panniantong/agent-reach) can be connected separately to search and read sources that ordinary tools struggle to access. Chelovechno can use it when already available and useful. The base skill works without it.

See the [setup and access notes](docs/agent-reach_en.md). There is no automatic installation. Channel support and account requirements depend on Agent Reach and the environment; access to every service is not guaranteed.

## Approach

Understand the task and format, choose a useful point or source, then write for a particular reader or listener.

News explains what changed for the reader; an article develops a subject; an email clarifies the situation and action; a script works aloud. Select details by purpose and retain material qualifications. By default, authored prose avoids the em dash U+2014 by restructuring sentences and uses straight double quotes U+0022 when needed. Exact quotes and mandatory wording stay intact. Do not invent personal experience or add artificial mistakes. See [research and sources](SOURCES_en.md).

## Examples and checks

- [English examples](examples/texts_en.md) from fictional briefs.
- [Live research example, in Russian](evals/live-search.md), with a checked source and finished post.
- [Evaluation guide](evals/README_en.md) for format, voice, accuracy and freshness.
- [Threads, X and Reddit review](evals/platform-review_en.md), with evidence and sampling limits.
- [Comments across 10 topics](evals/conversation-review_en.md), with reply context, observations and teaching examples.
- [Audit history, in Russian](evals/smoke-results.md), separating manual review from model testing.

Development requires Node.js 22 or later, with no dependencies to install:

```bash
node scripts/prepare.mjs
```

This checks structure, local links and completeness of both editions, then builds `dist/chelovechno.md` and `dist/chelovechno_en.md`. GitHub Actions runs the same checks. They verify packaging, not a "humanity score." Behavioral changes are reviewed using the scenarios in `evals/`.

Quality depends on the model, material and task. This skill does not determine authorship or promise AI-detector results. News still needs source verification; the author's personal experience must come from the author.

## License

[MIT](LICENSE). External sources retain their own licenses and authorship.
