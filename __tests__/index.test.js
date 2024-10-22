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

test('stylish', () => {
  const expectedStylish = readFile('result_stylish.txt').trim();

  expect(genDiff(filepathJSON1, filepathJSON2)).toEqual(expectedStylish);
  expect(genDiff(filepathYML1, filepathYAML2)).toEqual(expectedStylish);
  expect(genDiff(filepathJSON1, filepathYAML2)).toEqual(expectedStylish);
  expect(genDiff(filepathYML1, filepathJSON2)).toEqual(expectedStylish);
});

test('plain', () => {
  const expectedPlain = readFile('result_plain.txt').trim();

  expect(genDiff(filepathJSON1, filepathJSON2, 'plain')).toEqual(expectedPlain);
  expect(genDiff(filepathYML1, filepathYAML2, 'plain')).toEqual(expectedPlain);
  expect(genDiff(filepathJSON1, filepathYAML2, 'plain')).toEqual(expectedPlain);
  expect(genDiff(filepathYML1, filepathJSON2, 'plain')).toEqual(expectedPlain);
});

test('json', () => {
  const expectedJSON = readFile('result_json.txt').trim();

  expect(genDiff(filepathJSON1, filepathJSON2, 'json')).toEqual(expectedJSON);
  expect(genDiff(filepathYML1, filepathYAML2, 'json')).toEqual(expectedJSON);
  expect(genDiff(filepathJSON1, filepathYAML2, 'json')).toEqual(expectedJSON);
  expect(genDiff(filepathYML1, filepathJSON2, 'json')).toEqual(expectedJSON);
});

test('incorrect format', () => {
  expect(() => genDiff(filepathJSON1, filepathJSON1, 'html')).toThrow(
    "Format 'html' is not defined.",
  );
});
