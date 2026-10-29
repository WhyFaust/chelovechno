import assert from 'node:assert/strict';
import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import { basename, dirname, isAbsolute, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const skill = resolve(root, 'skills/chelovechno');
const read = (path) => readFile(path, 'utf8');
assert.equal(await read(resolve(skill, 'LICENSE.txt')), await read(resolve(root, 'LICENSE')));

async function checkLinks(directory) {
  for (const item of await readdir(directory, { withFileTypes: true })) {
    if (['.git', '.cache', 'dist', 'node_modules'].includes(item.name)) continue;
    const path = resolve(directory, item.name);
    if (item.isDirectory()) {
      await checkLinks(path);
    } else if (item.name.endsWith('.md')) {
      const content = await read(path);
      for (const match of content.matchAll(/\[[^\]]*\]\(([^)\s]+)\)/g)) {
        const target = match[1];
        if (/^(?:[a-z][a-z0-9+.-]*:|#)/i.test(target)) continue;
        const linked = resolve(dirname(path), decodeURIComponent(target.split('#')[0]));
        const local = relative(root, linked);
        assert(!local.startsWith('..') && !isAbsolute(local), `${path}: link leaves repository`);
        await stat(linked);
        if (path.startsWith(skill)) {
          const inSkill = relative(skill, linked);
          assert(!inSkill.startsWith('..') && !isAbsolute(inSkill), 'Skill must be self-contained');
        }
      }
    }
  }
}

await checkLinks(root);
const cases = JSON.parse(await read(resolve(root, 'evals/cases.json')));
assert(Array.isArray(cases) && cases.length > 0, 'Missing evaluation cases');
assert.equal(new Set(cases.map((item) => item.id)).size, cases.length, 'Duplicate case IDs');
for (const item of cases) {
  assert(item.id && item.prompt && item.checks?.length, 'Incomplete evaluation case');
  for (const [label, text] of Object.entries(item.example_outputs ?? {})) {
    if (item.example_constraints?.no_em_dash) {
      assert(!text.includes('\u2014'), `${item.id}: em dash in ${label} example`);
    }
    const limit = item.example_constraints?.max_characters?.[label];
    if (limit !== undefined) {
      assert([...text].length <= limit, `${item.id}: ${label} example exceeds ${limit} characters`);
    }
  }
}

await mkdir(resolve(root, 'dist'), { recursive: true });
let expectedVersion;
for (const [suffix, licenseHeading] of [['', 'Лицензия'], ['_en', 'License']]) {
  const filename = `SKILL${suffix}.md`;
  const entry = await read(resolve(skill, filename));
  const frontmatter = entry.match(/^---\n([\s\S]+?)\n---\n/);
  assert(frontmatter, `${filename}: missing frontmatter`);
  assert.match(frontmatter[1], new RegExp(`^name: ${basename(skill)}$`, 'm'));
  const description = frontmatter[1].match(/^description: "(.+)"$/m)?.[1];
  assert(description && description.length <= 1024, `${filename}: invalid description`);
  assert.match(frontmatter[1], /^license: MIT$/m);
  const version = frontmatter[1].match(/^  version: "([^"]+)"$/m)?.[1];
  assert(version, `${filename}: missing version`);
  expectedVersion ??= version;
  assert.equal(version, expectedVersion, 'Skill translations have different versions');

  let portable = entry;
  for (const name of ['research', 'adaptation', 'editing']) {
    const body = await read(resolve(skill, `references/${name}${suffix}.md`));
    portable = portable.replaceAll(`(references/${name}${suffix}.md)`, `(#reference-${name})`);
    portable += `\n\n<a id="reference-${name}"></a>\n\n${body}`;
    assert(portable.includes(body), `Missing reference: ${name}${suffix}`);
  }
  portable += `\n\n# ${licenseHeading}\n\n${await read(resolve(root, 'LICENSE'))}`;
  assert(!/\]\(references\//.test(portable), 'Unresolved reference in portable prompt');
  for (const match of portable.matchAll(/\]\(#(reference-[^)]+)\)/g)) {
    assert(portable.includes(`id="${match[1]}"`), `Missing anchor: ${match[1]}`);
  }
  assert(portable.startsWith(frontmatter[0]), 'Portable prompt lost skill metadata');
  await writeFile(resolve(root, `dist/chelovechno${suffix}.md`), portable, 'utf8');
}
console.log(`OK: RU/EN skill structure, local links, ${cases.length} case definitions, 2 portable prompts`);
