import assert from 'node:assert/strict';
import { readFileSync, writeFileSync } from 'node:fs';

const released = process.argv[2]?.match(/^v(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/);
assert(released, 'Expected the latest stable release tag, vX.Y.Z');

let bump = 0;
for (const message of readFileSync(0, 'utf8').split('\0')) {
  const commit = message.trim();
  const header = commit.match(/^(\w+)(?:\([^\r\n)]+\))?(!)?:[ \t]+\S/);
  const breaking = header?.[2] || /^BREAKING(?: |-)CHANGE:[ \t]+\S/m.test(commit);
  const type = header?.[1].toLowerCase();
  bump = Math.max(bump, breaking ? 3 : type === 'feat' ? 2 : ['fix', 'perf'].includes(type) ? 1 : 0);
}
if (!bump) process.exit(0);

const [major, minor, patch] = released.slice(1).map(BigInt);
const candidates = [released[0].slice(1), `${major}.${minor}.${patch + 1n}`, `${major}.${minor + 1n}.0`, `${major + 1n}.0.0`];
const version = candidates[bump];
const files = ['SKILL.md', 'SKILL_en.md'].map((name) => new URL(`../skills/chelovechno/${name}`, import.meta.url));
const entries = files.map((file) => readFileSync(file, 'utf8'));
const pattern = /^  version: "([^"]+)"$/m;
const versions = entries.map((entry) => entry.match(/^---\n([\s\S]+?)\n---\n/)?.[1].match(pattern)?.[1]);
assert.equal(versions[0], versions[1], 'Skill translations have different versions');
for (const current of versions) {
  assert(candidates.slice(0, bump + 1).includes(current), 'Skill version differs from the released or pending version');
}
for (let i = 0; i < files.length; i++) {
  writeFileSync(files[i], entries[i].replace(pattern, `  version: "${version}"`), 'utf8');
}
console.log(version);
