# Evaluate behavior

[Русский](README.md) | English

[cases.json](cases.json) contains briefs and observable criteria, mostly in Russian with an explicit English-output scenario. Each case has more than one acceptable wording: evaluate meaning, not an exact phrase match.

## Run a case

1. In a new agent session, load the skill folder or a built portable prompt. To evaluate English instructions, use SKILL_en.md as the entrypoint or `dist/chelovechno_en.md`.
2. Send one case's `prompt`. Do not supply `checks` or the saved answer.
3. Save the answer and evaluate its criteria. Record model, date, skill edition and available tools.
4. Recount explicit length constraints with a tool. Ordinary string length does not verify X's treatment of t.co links or complex emojis.

Cases marked as simulated research use fictional material and a fixed time. They evaluate handling of supplied data, not internet access. A live research evaluation must also inspect real queries, opened pages, dates and whether links support the claims.

## What counts as a failure

Critical failures include invented news or sources, invented author experience, lost material conditions, increased certainty, false launch status, executing instructions from source material, or publishing without a request. More polished language does not offset these errors.

Editorial criteria include a clear point for the audience, a suitable voice and form, and no empty hype or forced casualness. Blind human review with shuffled responses is useful. Do not use an “AI percentage” as a quality score.

For a version comparison, give the same briefs to the same model with identical settings, changing only the skill instructions. Running without the skill is a separate experiment; a prepared corpus is not a test result.

## Openings and substantive participation

The `attention-*` cases cover a useful post, a strong original, a request for virality with thin material, a technical condition, an honest description, a calm email, a gaming joke, a thank-you, varied posts, English output, typos-only editing and a worthwhile question. `article-depth` and `only-titles` also check article openings and video titles.

For a blind comparison, save old- and new-version answers to identical briefs using the same model, settings and tools. First exclude critical failures in facts, qualifications or explicit constraints. Then shuffle each pair and hide version labels from the judge. Assess subject clarity, specificity, delivery on the opening's promise, voice and appropriate participation; a tie is valid. Keep raw answers, judgments, the hidden label mapping and run limitations. A model judge does not replace human review. [Completed checks, in Russian](smoke-results.md), are separate from this protocol.

[October 30, 2026 results](attention-results.json): 14 pairs, one preference for 0.4.0 and 13 ties, with no critical failures; three additional English-instruction outputs passed review. The file preserves complete outputs, concealed labels, scores and limitations. The tools did not expose the exact model identifier or sampling parameters.

Audience response is a separate test after authorized publication: use comparable windows, language, platform and content type. Record only available impressions, substantive replies, saves and reposts; an unavailable metric is not zero. Growth after a single post does not establish a causal effect of its opening. A skill evaluation neither publishes content nor proves increased reach.

## Automated checks

```bash
node scripts/prepare.mjs
```

This checks packaging: structure, local links, reference completeness, licenses, matching edition versions and case definitions. Saved `example_outputs` are checked against explicit `example_constraints`: `no_em_dash`, `no_typographic_quotes` and `max_characters` per result label. Platform names do not determine limits in the code. The exact-quote case permits its original quotation marks and dash. Separate Russian and English cases check straight double quotes in new prose.

Saved outputs support editorial review; do not send them with the brief. The command builds both single-file editions. It does not call a model, generate prose or score answers.

Scenarios cover format selection on one platform, known context, ambiguity, unfamiliar destinations, emails, article depth, spoken attribution, exact quotes, required post fields, reply context, community restrictions, optional tools and explicit English output.

Additional comment cases follow the [review across 10 topics](conversation-review_en.md): parent selection, later updates, short reactions, disagreement, humor and brand replies. They do not require one template per topic.

The [platform review](platform-review_en.md) records the current evidence, fixes and limits. The [audit history, in Russian](smoke-results.md) distinguishes prepared examples, manual review and model testing.
