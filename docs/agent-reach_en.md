# Agent Reach as an optional add-on

[Русский](agent-reach.md) | English

[Agent Reach](https://github.com/Panniantong/agent-reach) supplies separate tools for searching and reading. Chelovechno selects material, verifies it and writes. The add-on is optional: existing search, browsers and connectors remain suitable.

## Connect it

If you want to install it, follow the author's current [installation guide](https://github.com/Panniantong/Agent-Reach/blob/main/docs/install.md). For example, make a separate request to your agent:

```text
Install Agent Reach using its official guide:
https://github.com/Panniantong/Agent-Reach/blob/main/docs/install.md
Connect the channels I need. Ask me about account sign-in and browser session selection.
```

The author warns that the PyPI package named `agent-reach` is a different project. The GitHub guide identifies the intended installation source. This repository needs no additional dependency.

After installation, check the version and available channels:

```bash
agent-reach version
agent-reach channels
```

These commands come from the reviewed documentation for version 1.6 and later. Use the relevant help for another version. Having the program installed does not establish that a channel works.

## Use it with Chelovechno

```text
$chelovechno Find a fresh photography story from the last three days
and write an English post for my channel. Use the already connected
Agent Reach if it helps read a source. Show sources separately.
```

The agent follows Agent Reach's installed skill and uses it for reading when helpful. Event dates, primary sources, qualifications and completeness still need verification. A social writing sample does not verify the facts asserted in that post.

If the add-on is absent or a channel unavailable, use other tools or disclose the gap. An ordinary writing request does not trigger installation or account sign-in.

## Access boundaries

In the [documentation reviewed on October 29, 2026](https://github.com/Panniantong/Agent-Reach/blob/14c213405669414492bda0f8d52cc6531d062c45/docs/README_en.md), Reddit is an optional channel requiring login, and X is experimental and requires login. Threads is absent from the published table. This records the reviewed version, not a permanent support matrix for Chelovechno.

Some channels may reuse an existing browser session. Installation, account selection and session access are separate setup decisions. Keep keys and cookies out of drafts, repository files and public reports. The add-on does not authorize publishing, sending messages or bypassing a source's access restrictions.

The reviewed [browser documentation](https://github.com/Panniantong/Agent-Reach/blob/14c213405669414492bda0f8d52cc6531d062c45/docs/cloakbrowser.md) and [session guide](https://github.com/Panniantong/Agent-Reach/blob/14c213405669414492bda0f8d52cc6531d062c45/agent_reach/skill/references/sessions.md) describe a separate CloakBrowser/Chrome and login reuse from Chrome through a connected bridge. Attaching an already open Firefox is not established. Being signed into Firefox does not establish a working Reach session; use available browser control or separately configure the add-on at the user's choice.

This integration was reviewed through its documentation and the skill instructions. Agent Reach installation and channel sign-in were not performed during this review.
