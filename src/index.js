import fs from 'fs';
import path from 'path';
import parsers from './parsers.js';
import { getDifferentObject, getFullPath } from './utils.js';
import createFormat from './formatters/index.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const fullFilePath1 = getFullPath(filepath1);
  const fullFilePath2 = getFullPath(filepath2);

  const parseFile1 = parsers(fs.readFileSync(fullFilePath1, 'utf8'), path.extname(filepath1));
  const parseFile2 = parsers(fs.readFileSync(fullFilePath2, 'utf8'), path.extname(filepath2));

  const fileDiff = getDifferentObject(parseFile1, parseFile2);
  const result = createFormat(fileDiff, format);

  return result;
};

export default genDiff;
