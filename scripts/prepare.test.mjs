import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { copyFile, cp, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';

test('builds both portable editions and rejects broken skill inputs', async (t) => {
  const root = await mkdtemp(join(tmpdir(), 'chelovechno-prepare-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(join(root, 'scripts'));
  await mkdir(join(root, 'evals'));
  await cp(new URL('../skills', import.meta.url), join(root, 'skills'), { recursive: true });
  await copyFile(new URL('../LICENSE', import.meta.url), join(root, 'LICENSE'));
  const script = join(root, 'scripts/prepare.mjs');
  await copyFile(new URL('./prepare.mjs', import.meta.url), script);
  const casesFile = join(root, 'evals/cases.json');
  const example = {
    id: 'small-example', prompt: 'Write a short post.', checks: ['Preserves the facts'],
    example_constraints: { no_em_dash: true, no_typographic_quotes: true, max_characters: { post: 2 } },
    example_outputs: { post: '🙂a' },
  };
  const saveCases = (cases) => writeFile(casesFile, JSON.stringify(cases));
  const run = () => spawnSync(process.execPath, [script], { cwd: tmpdir(), encoding: 'utf8' });
  await saveCases([example]);
  const result = run();
  assert.equal(result.status, 0, result.stderr);
  for (const suffix of ['', '_en']) {
    const portable = await readFile(join(root, `dist/chelovechno${suffix}.md`), 'utf8');
    for (const name of ['research', 'adaptation', 'editing']) {
      const reference = await readFile(join(root, `skills/chelovechno/references/${name}${suffix}.md`), 'utf8');
      assert(portable.includes(reference));
      assert(portable.includes(`](#reference-${name})`));
    }
    assert(!portable.includes('](references/'));
    assert(portable.includes(await readFile(join(root, 'LICENSE'), 'utf8')));
  }

  await t.test('output labels do not inherit limits from Object.prototype', async () => {
    await saveCases([{ ...example, example_constraints: {}, example_outputs: { constructor: 'Text' } }]);
    const result = run();
    assert.equal(result.status, 0, result.stderr);
  });

  for (const [label, changes] of [
    ['non-text prompt', { prompt: 42 }],
    ['blank prompt', { prompt: '  ' }],
    ['non-list checks', { checks: 'Preserves the facts' }],
    ['empty check', { checks: [''] }],
    ['non-object outputs', { example_outputs: 'a' }],
    ['non-object constraints', { example_constraints: [] }],
    ['non-object limits', { example_constraints: { max_characters: 2 } }],
    ['non-text output', { example_outputs: { post: 42 } }],
    ['unknown output limit', { example_constraints: { max_characters: { missing: 2 } } }],
    ['non-integer limit', { example_constraints: { max_characters: { post: '2' } } }],
    ['non-boolean constraint', { example_constraints: { no_em_dash: 'false' } }],
    ['em dash', { example_outputs: { post: '—' } }],
    ['typographic quotes', { example_outputs: { post: '«a»' } }],
    ['too many characters', { example_outputs: { post: '🙂ab' } }],
  ]) {
    await t.test(label, async () => {
      await saveCases([{ ...example, ...changes }]);
      assert.notEqual(run().status, 0, `Accepted ${label}`);
    });
  }
  await saveCases([example]);

  const entryPaths = ['SKILL.md', 'SKILL_en.md'].map((name) => join(root, 'skills/chelovechno', name));
  const entries = await Promise.all(entryPaths.map((path) => readFile(path, 'utf8')));
  for (const [label, pattern, replacement] of [
    ['invalid quoted description', /^description: .*$/m, 'description: "bad "quote""'],
    ['invalid release version', /^  version: .*$/m, '  version: "next"'],
  ]) {
    await t.test(label, async () => {
      for (let i = 0; i < entryPaths.length; i++) {
        await writeFile(entryPaths[i], entries[i].replace(pattern, replacement));
      }
      assert.notEqual(run().status, 0, `Accepted ${label}`);
    });
  }
});
