import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { copyFile, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';

test('release versions follow commit types and preserve both editions on retries and errors', async (t) => {
  const root = await mkdtemp(join(tmpdir(), 'chelovechno-release-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(join(root, 'scripts'));
  const skill = join(root, 'skills/chelovechno');
  await mkdir(skill, { recursive: true });
  const script = join(root, 'scripts/release-version.mjs');
  await copyFile(new URL('./release-version.mjs', import.meta.url), script);
  const files = ['SKILL.md', 'SKILL_en.md'].map((name) => join(skill, name));
  const entry = (version) => `---\nmetadata:\n  version: "${version}"\n---\n\nKeep this content.\n`;
  const run = (messages, tag = 'v0.4.9') => spawnSync(process.execPath, [script, tag], {
    input: messages.join('\0'), encoding: 'utf8',
  });

  for (const [messages, expected] of [
    [['fix: correct output'], '0.4.10'],
    [['perf(parser): reduce work'], '0.4.10'],
    [['feat: add a format'], '0.5.0'],
    [['fix: correct output', 'feat: add a format', 'docs: update usage'], '0.5.0'],
    [['Merge pull request #4 from branch', 'feat: add a format'], '0.5.0'],
    [['feat!: replace the interface'], '1.0.0'],
    [['refactor(parser)!: replace the interface'], '1.0.0'],
    [['fix: change output\n\nBREAKING CHANGE: output shape changed'], '1.0.0'],
    [['docs: update usage\n\nBREAKING-CHANGE: removed an interface', 'feat: add a format'], '1.0.0'],
    [['FEAT(parser): add a format'], '0.5.0'],
    [['docs: update usage', 'test: add cases', 'chore: maintain', 'ci: adjust job', 'build: adjust build', 'style: format', 'refactor: simplify'], ''],
    [['Merge pull request #4 from branch', 'Update documentation', 'docs: mention feat: in the body\n\nfeat: is only an example'], ''],
    [[], ''],
  ]) {
    for (const file of files) await writeFile(file, entry('0.4.9'));
    const result = run(messages);
    assert.equal(result.status, 0, result.stderr);
    assert.equal(result.stdout.trim(), expected);
    for (const file of files) assert.equal(await readFile(file, 'utf8'), entry(expected || '0.4.9'));
    if (expected) {
      const retry = run([...messages, `chore(release): v${expected}`]);
      assert.equal(retry.status, 0, retry.stderr);
      assert.equal(retry.stdout.trim(), expected);
      for (const file of files) assert.equal(await readFile(file, 'utf8'), entry(expected));
    }
  }

  for (const [pending, messages, expected] of [
    ['0.4.10', ['fix: correct output', 'feat: add a format'], '0.5.0'],
    ['0.5.0', ['feat: add a format', 'feat!: replace the interface'], '1.0.0'],
  ]) {
    for (const file of files) await writeFile(file, entry(pending));
    const result = run(messages);
    assert.equal(result.status, 0, result.stderr);
    assert.equal(result.stdout.trim(), expected);
    for (const file of files) assert.equal(await readFile(file, 'utf8'), entry(expected));
  }

  for (const [versions, tag] of [
    [['0.4.9', '0.4.8'], 'v0.4.9'],
    [['0.3.0', '0.3.0'], 'v0.4.9'],
    [['0.4.9', '0.4.9'], 'v0.4.9;echo unsafe'],
  ]) {
    for (let i = 0; i < files.length; i++) await writeFile(files[i], entry(versions[i]));
    const result = run(['fix: correct output'], tag);
    assert.notEqual(result.status, 0);
    for (let i = 0; i < files.length; i++) assert.equal(await readFile(files[i], 'utf8'), entry(versions[i]));
  }
});
