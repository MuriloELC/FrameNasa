import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const runtimeFiles = [
  'api-client.js',
  'app.js',
  'components.js',
  'config.js',
  'data.js',
  'index.html',
  'mapping.js',
  'patterns.html',
  'patterns.js',
  'scenario.js',
  'examples/observations.csv',
  'examples/observations.json',
];

const providerSpecificMarkers = [
  ['nasa', '.gov'].join(''),
  ['earthdata', '.nasa', '.gov'].join(''),
  ['power', '.larc', '.nasa', '.gov'].join(''),
  ['firms', '.modaps', '.eosdis', '.nasa', '.gov'].join(''),
];

test('runtime e exemplos não incorporam endpoints específicos de provedores', async () => {
  for (const file of runtimeFiles) {
    const content = (await readFile(new URL(`../${file}`, import.meta.url), 'utf8')).toLowerCase();

    for (const marker of providerSpecificMarkers) {
      assert.equal(content.includes(marker), false, `${file} contém endpoint específico: ${marker}`);
    }
  }
});
