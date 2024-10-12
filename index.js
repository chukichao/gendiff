import getFileByPath from './src/utils/getFileByPath.js';

const genDiff = (filepath1, filepath2) => {
  const file1 = getFileByPath(filepath1);
  const file2 = getFileByPath(filepath2);
  console.log(file1);
  console.log(file2);
};

export default genDiff;
