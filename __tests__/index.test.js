import { test, expect, beforeAll } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let filepathJSON1;
let filepathJSON2;
let filepathYML1;
let filepathYAML2;
let filepathErrorFormat;

beforeAll(() => {
  filepathJSON1 = getFixturePath('file1.json');
  filepathJSON2 = getFixturePath('file2.json');
  filepathYML1 = getFixturePath('file1.yml');
  filepathYAML2 = getFixturePath('file2.yaml');
  filepathErrorFormat = getFixturePath('file.ini');
});

test('stylish', () => {
  const expectedStylish = readFile('expectedStylish.txt').trim();

  expect(genDiff(filepathJSON1, filepathJSON2)).toEqual(expectedStylish);
  expect(genDiff(filepathYML1, filepathYAML2)).toEqual(expectedStylish);
  expect(genDiff(filepathJSON1, filepathYAML2)).toEqual(expectedStylish);
  expect(genDiff(filepathYML1, filepathJSON2)).toEqual(expectedStylish);
});

test('plain', () => {
  const expectedPlain = readFile('expectedPlain.txt').trim();

  expect(genDiff(filepathJSON1, filepathJSON2, 'plain')).toEqual(expectedPlain);
  expect(genDiff(filepathYML1, filepathYAML2, 'plain')).toEqual(expectedPlain);
  expect(genDiff(filepathJSON1, filepathYAML2, 'plain')).toEqual(expectedPlain);
  expect(genDiff(filepathYML1, filepathJSON2, 'plain')).toEqual(expectedPlain);
});

test('json', () => {
  const expectedJSON = readFile('expectedJSON.txt').trim();

  expect(genDiff(filepathJSON1, filepathJSON2, 'json')).toEqual(expectedJSON);
  expect(genDiff(filepathYML1, filepathYAML2, 'json')).toEqual(expectedJSON);
  expect(genDiff(filepathJSON1, filepathYAML2, 'json')).toEqual(expectedJSON);
  expect(genDiff(filepathYML1, filepathJSON2, 'json')).toEqual(expectedJSON);
});

test('error tests', () => {
  expect(() => genDiff(filepathJSON1, filepathErrorFormat)).toThrow(
    "This file extension '.ini' is not supported.",
  );
  expect(() => genDiff(filepathJSON1, filepathJSON1, 'html')).toThrow(
    "Format 'html' is not defined.",
  );
});
