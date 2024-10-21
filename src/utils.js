import _ from 'lodash';
import path from 'path';

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);

const getDifferentObject = (obj1, obj2) => {
  const allKeys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2))).map((key) => {
    const oldValue = obj1[key];
    const newValue = obj2[key];

    if (!_.has(obj2, key)) {
      return {
        action: 'deleted',
        key,
        oldValue,
      };
    }
    if (!_.has(obj1, key)) {
      return {
        action: 'added',
        key,
        newValue,
      };
    }
    if (_.isObject(oldValue) && _.isObject(newValue)) {
      return {
        action: 'nested',
        key,
        children: getDifferentObject(oldValue, newValue),
      };
    }
    if (oldValue !== newValue) {
      return {
        action: 'changed',
        key,
        oldValue,
        newValue,
      };
    }
    return {
      action: 'unchanged',
      key,
      oldValue,
    };
  });

  return allKeys;
};

export { getDifferentObject, getFullPath };
