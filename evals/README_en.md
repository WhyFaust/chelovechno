# Evaluate behavior

[Русский](README.md) | English

[cases.json](cases.json) contains briefs and observable criteria. Evaluate meaning and task completion, without requiring one reference phrase. A prepared case alone is not a passed model test.

## Run a case

1. In a fresh agent session, load `skills/chelovechno` or a built `dist/chelovechno.md`. For English instructions, use `SKILL_en.md` or `dist/chelovechno_en.md`.
2. Send one `prompt` from cases.json, without `checks` or saved `example_outputs`.
3. Preserve the raw response and judge each criterion. Record model, date, instruction language and format, tools and run limitations.
4. Recount explicit length limits with a tool. Ordinary Unicode code-point length does not verify X's weighted t.co links or complex emojis.

Judge instruction language and requested output language separately. Simulated-research cases use fictional material and a fixed time. They check data handling, without establishing internet access. For live research, also preserve actual queries, opened pages, dates and evidence for key claims.

## What counts as a failure

Critical failures include invented news or sources, invented author experience, lost material conditions, increased certainty, false launch status, executing instructions from source material or publishing without a request. More polished prose does not offset these failures.

Editorial criteria include a clear point for the audience, suitable voice and form, and no empty hype or forced casualness. Blind human review with shuffled responses is useful. An "AI percentage" is not a quality score.

## Compare versions

Give identical briefs to the same model with identical settings and tools, changing only skill instructions. First exclude critical failures. Then shuffle answers within each pair and hide version labels from the judge. Assess subject clarity, specificity, delivery on the opening's promise, voice and appropriate participation; a tie is valid.

Keep raw answers, judgments, the concealed-label mapping and limitations. Fingerprint instructions using original Git blob bytes; file order and brief serialization are defined in each report's `method.fingerprints`. Hashes identify the files used, without identifying the full model context. A no-skill comparison is a separate experiment. A model judge does not replace human review.

## Cases and reports

| Group | Coverage | Saved material |
|---|---|---|
| `structure-*` | Useful post with an offer, poll, explanation without sales, functional keyword and AIDA | [12 RU/EN responses and judgments on 42 criteria](reports/structure-results.json) |
| `attention-*`, `article-depth`, `only-titles` | Openings, development of the subject and appropriate participation | [14 response pairs and three additional English-instruction responses](reports/attention-results.json) |
| Comments and replies | Parent selection, later updates, short reactions, disagreement, humor and brand replies | [Discussions across 10 topics](reports/conversation-review_en.md) |
| Adaptation | Form, voice, context, required fields and community restrictions | [Public-post review](reports/platform-review_en.md) |
| Research | Sources, freshness, dates and no invented news | [Live research example, in Russian](reports/live-search.md) |
| Check history | Editorial examples, installation, build and completed model runs | [Report with limitations, in Russian](reports/smoke-results.md) |

In the October 30, 2026 `structure-*` run, one independent judge accepted 12 responses on all 42 criteria. In the `attention-*` comparison, one pair favored 0.4.0 and 13 tied, with no critical failures recorded. These are separate limited runs; they do not establish behavior across all models and cases. The JSON reports retain full responses and limitations.

## Automated checks

```bash
node --test scripts/prepare.test.mjs scripts/release-version.test.mjs
node scripts/prepare.mjs
```

Checks cover structure, local links, complete references, licenses, matching stable edition versions, single-line JSON-compatible descriptions and case definitions. Briefs and criteria must be nonempty strings, with criteria supplied as an array.

Saved `example_outputs` are checked against explicit `example_constraints`: boolean `no_em_dash` and `no_typographic_quotes`, and nonnegative integer `max_characters` for an existing output label. Unknown constraint names are rejected. Length is measured in Unicode code points; platform names do not set limits. Exact quotations may preserve their original quotation marks and dash.

The build test uses an isolated temporary folder to check both portable editions and rejection of broken inputs. Release tests cover version selection, retries and preserving files on errors. These commands build files and check packaging; they do not generate or judge model responses. See the [development guide](../docs/development_en.md).

Measure audience reactions separately after authorized publication: compare similar windows, languages, platforms and content types. Record only available impressions, substantive replies, saves and reposts. A missing metric is not zero, and growth after one post does not establish a causal effect from its opening.
