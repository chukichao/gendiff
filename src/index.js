import fs from 'fs';
import parse from './parsers.js';
import { getFullPath, getDifferentObject, getExtension } from './utils.js';
import createFormat from './formatters/index.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const fullFilePath1 = getFullPath(filepath1);
  const fullFilePath2 = getFullPath(filepath2);

  const parseFile1 = parse(fs.readFileSync(fullFilePath1, 'utf8'), getExtension(filepath1));
  const parseFile2 = parse(fs.readFileSync(fullFilePath2, 'utf8'), getExtension(filepath2));

  const fileDiff = getDifferentObject(parseFile1, parseFile2);
  const result = createFormat(fileDiff, format);
  console.log(result);

  return result;
};

export default genDiff;
