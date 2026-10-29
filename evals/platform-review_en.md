# Final review against public posts

[Русский](platform-review.md) | English

Reviewed on October 29, 2026 for version 0.3.0. The aim was to compare instructions with accessible real posts and fix concrete conflicts. This is an editorial sample, not a popularity study or a fresh-news search.

The subsequent [comment review across 10 topics](conversation-review_en.md) covers replies, later clarifications and Firefox access limits.

## Material read

**Threads.** The official connector returned full texts of five `whyfaust` posts from October 11–25:

- [Moving working habits between agents](https://www.threads.com/@whyfaust/post/De6ZMuuG8in).
- [Agent memory and past decisions](https://www.threads.com/@whyfaust/post/DerbqsRIPvO).
- [An interview allowing AI](https://www.threads.com/@whyfaust/post/DegV_VOlQAK).
- [Changing requirements in a teaching project](https://www.threads.com/@whyfaust/post/DeZPSD1kaal).
- [Explaining a filter to obtain a command](https://www.threads.com/@whyfaust/post/DeWnB-QkZq9).

The sample includes concrete work situations, short reasoning and substantive questions. Not every piece ends in a question. Personal experience in these posts cannot be transferred to another author. All five results belong to one account, so they illustrate that author's presentation rather than Threads as a whole. The connector denied reading another public profile; the exact access cause was not established.

**X.** The full posts by [Max Weinbach, May 21](https://x.com/mweinbach/status/2057234066702045614), and [cheating daddy, April 1](https://x.com/cheating_daddy/status/2039409929757581432), were opened in a browser. One refers to its author's own recording; the other reacts emotionally to a tool. Their tones differ. Neither establishes a universal requirement for slang, capitals or emotion. Their product claims were not adopted as facts. These examples are not presented as fresh news.

**Reddit.** Opened a [discussion about community changes](https://www.reddit.com/r/LocalLLaMA/comments/1wctos6/notes_on_a_hobby_sub_going_mainstream/) and a [model-related post](https://www.reddit.com/r/LocalLLaMA/comments/1wz2x2l/introducing_mistral_large_4_preview/). The first exposes a developed post and some comments; the second a title, link and part of the discussion. Replies depend on preceding comments rather than functioning as standalone announcements. A participant's desired rules were not treated as official community rules.

The [Reddit posting and commenting guide](https://support.reddithelp.com/hc/en-us/articles/360060422572-How-do-I-post-and-comment-on-Reddit) separately supports post titles and checking community rules. The selected community's rules page did not expose its rules without sign-in, so no specific prohibitions from it were added to the skill.

## Fixes

1. **The ban on extra titles conflicted with required fields.** A post could lose a title it needed. Required components now belong to one deliverable, while an explicit request for one field takes priority. Unrequested content packages remain excluded.
2. **Reply context and local rules needed clearer guidance.** Added reading the relevant discussion, addressing a specific point, checking material community rules and choosing required categories only from verified options. Unavailable rules do not permit a compliance claim.
3. **Samples can be overgeneralized.** Clarified that another person's post illustrates possible presentation and that author's opinion. It defines neither a platform-wide voice nor verified technical facts. Voice and stance follow the author and brief.

No platform-mode handbook was reintroduced. The em-dash preference remains an author setting; exact quotes and mandatory wording remain protected.

## Requested additions

Added English instructions and references, README, sources, examples, evaluation guide and display metadata. Two portable files are built from their respective references. Both editions keep the same skill name and Russian output default.

Agent Reach is documented as a separate optional add-on. Its README and install guide were reviewed at a [pinned revision](https://github.com/Panniantong/Agent-Reach/tree/14c213405669414492bda0f8d52cc6531d062c45). There, Reddit needs an optional channel and login, X is experimental, and Threads is not listed. Installing the program does not establish that every service works. Installation, sign-in and session transfer were not performed in this review.

## Checks and limits

Added cases for required fields, one-field output, a reply in context, community-rule conflict, strangers' manner, an absent add-on and an English email. Saved answers were prepared and manually reviewed in this session, not obtained from an independent model trial.

Build and invalid-input checks are recorded in the [audit history, in Russian](smoke-results.md). A corpus and packaging checks do not establish consistent behavior across models. The initial post sample above covers one Threads author, one Reddit community and two X authors; the broader comment review is recorded separately. Engagement metrics were not used for conclusions.
