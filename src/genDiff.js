import { readFileSync } from 'node:fs';
import _ from 'lodash';

const getObjByPath = (pathToFile) => {
  if (pathToFile.endsWith('.json')) {
    return JSON.parse(readFileSync(pathToFile));
  }
  return null;
};

export default function genDiff(filepath1, filepath2) {
  const obj1 = _.cloneDeep(getObjByPath(filepath1));
  const obj2 = _.cloneDeep(getObjByPath(filepath2));

  let diff = [];
  _.forIn(obj1, (value, key) => {
    if (_.has(obj2, key) && value === obj2[key]) {
      diff = [...diff, `    ${key}: ${value}`];
    } else if (_.has(obj2, key) && value !== obj2[key]) {
      diff = [...diff, `  - ${key}: ${value}`, `  + ${key}: ${obj2[key]}`];
    } else {
      diff = [...diff, `  - ${key}: ${value}`];
    }
  });

  _.forIn(obj2, (value, key) => {
    if (!_.has(obj1, key)) {
      diff = [...diff, `  + ${key}: ${value}`];
    }
  });

  const sortStartPosition = 4;
  const sortedDiff = _.sortBy(diff, (item) => item.at(sortStartPosition));

  console.log(['{', ...sortedDiff, '}'].join('\n'));
}
