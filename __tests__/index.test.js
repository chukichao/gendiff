import { test, expect, beforeAll } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

import genDiff from '../src/genDiff.js';
import parsers from '../src/parsers.js';

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

  filepathErrorFormat = getFixturePath('file_ErrorFormat.txt');
});

test('genDiff', () => {
  const expectedResult = readFile('expected_result.txt').trim();

  expect(genDiff(filepathJSON1, filepathJSON2)).toEqual(expectedResult);
  expect(genDiff(filepathYML1, filepathYAML2)).toEqual(expectedResult);

  expect(genDiff(filepathJSON1, filepathYAML2)).toEqual(expectedResult);
  expect(genDiff(filepathYML1, filepathJSON2)).toEqual(expectedResult);
});

test('parsers', () => {
  const expectedObjFromJSON1 = JSON.parse(readFile('file1.json'));
  const expectedObjFromYML1 = yaml.load(readFile('file1.yml'));
  const expectedObjFromYAML2 = yaml.load(readFile('file2.yaml'));

  expect(parsers(filepathJSON1)).toEqual(expectedObjFromJSON1);
  expect(parsers(filepathYML1)).toEqual(expectedObjFromYML1);
  expect(parsers(filepathYAML2)).toEqual(expectedObjFromYAML2);

  expect(() => parsers(filepathErrorFormat)).toThrow('.txt is invalid format');
});
