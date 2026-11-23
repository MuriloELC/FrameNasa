import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {FRAMEWORK} from '../config.js';

test('versão e licença públicas permanecem sincronizadas',async()=>{
  const pkg=JSON.parse(await readFile(new URL('../package.json',import.meta.url),'utf8'));
  const version=(await readFile(new URL('../VERSION',import.meta.url),'utf8')).trim();
  const citation=await readFile(new URL('../CITATION.cff',import.meta.url),'utf8');
  assert.equal(pkg.version,FRAMEWORK.version);
  assert.equal(version,FRAMEWORK.version);
  assert.equal(pkg.license,FRAMEWORK.license);
  assert.match(citation,new RegExp(`version: ${FRAMEWORK.version.replaceAll('.','\\.')}`));
  assert.match(citation,new RegExp(`license: ${FRAMEWORK.license}`));
});
