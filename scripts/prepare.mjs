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
const hasText = (value) => typeof value === 'string' && value.trim().length > 0;
for (const item of cases) {
  assert(hasText(item.id) && hasText(item.prompt), 'Missing case ID or prompt');
  assert(Array.isArray(item.checks) && item.checks.length > 0 && item.checks.every(hasText), `${item.id}: invalid checks`);
  const outputs = item.example_outputs ?? {};
  const constraints = item.example_constraints ?? {};
  assert(typeof outputs === 'object' && !Array.isArray(outputs), `${item.id}: invalid example outputs`);
  assert(typeof constraints === 'object' && !Array.isArray(constraints), `${item.id}: invalid example constraints`);
  const limits = constraints.max_characters ?? {};
  assert(typeof limits === 'object' && !Array.isArray(limits), `${item.id}: invalid example limits`);
  for (const flag of ['no_em_dash', 'no_typographic_quotes']) {
    assert(constraints[flag] === undefined || typeof constraints[flag] === 'boolean', `${item.id}: invalid ${flag}`);
  }
  for (const [label, limit] of Object.entries(limits)) {
    assert(Object.hasOwn(outputs, label), `${item.id}: limit for missing example ${label}`);
    assert(Number.isSafeInteger(limit) && limit >= 0, `${item.id}: invalid limit for ${label}`);
  }
  for (const [label, text] of Object.entries(outputs)) {
    assert.equal(typeof text, 'string', `${item.id}: non-text ${label} example`);
    if (constraints.no_em_dash) {
      assert(!text.includes('\u2014'), `${item.id}: em dash in ${label} example`);
    }
    if (constraints.no_typographic_quotes) {
      assert(!/[\u00ab\u00bb\u2039\u203a\u201c-\u201f]/u.test(text), `${item.id}: typographic quotes in ${label} example`);
    }
    if (Object.hasOwn(limits, label)) {
      const limit = limits[label];
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
  const description = JSON.parse(frontmatter[1].match(/^description: (".*")$/m)?.[1] ?? 'null');
  assert(hasText(description) && [...description].length <= 1024, `${filename}: invalid description`);
  assert.match(frontmatter[1], /^license: MIT$/m);
  const version = frontmatter[1].match(/^  version: "([^"]+)"$/m)?.[1];
  assert(version, `${filename}: missing version`);
  assert.match(version, /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/, `${filename}: expected a stable release version`);
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
