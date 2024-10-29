import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const filepathJSON1 = getFixturePath('file1.json');
const filepathJSON2 = getFixturePath('file2.json');
const filepathYML1 = getFixturePath('file1.yml');
const filepathYAML2 = getFixturePath('file2.yaml');

const expectedStylish = readFile('result_stylish.txt').trim();
const expectedPlain = readFile('result_plain.txt').trim();
const expectedJSON = readFile('result_json.txt').trim();

test.each([
  [filepathJSON1, filepathJSON2],
  [filepathYML1, filepathYAML2],
  [filepathJSON1, filepathYAML2],
  [filepathYML1, filepathJSON2],
])('genDiff', (filepath1, filepath2) => {
  expect(genDiff(filepath1, filepath2)).toBe(expectedStylish);
  expect(genDiff(filepath1, filepath2, 'plain')).toBe(expectedPlain);
  expect(genDiff(filepath1, filepath2, 'json')).toBe(expectedJSON);
});
