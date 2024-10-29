import _ from 'lodash';
import path from 'path';

const getExtension = (filepath) => path.extname(filepath).slice(1);

const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);

const getDifferentObject = (data1, data2) => {
  const allKeys = _.sortBy(_.union(_.keys(data1), _.keys(data2))).map((key) => {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return {
        action: 'nested',
        key,
        children: getDifferentObject(data1[key], data2[key]),
      };
    }
    if (!_.has(data2, key)) {
      return {
        action: 'deleted',
        key,
        value: data1[key],
      };
    }
    if (!_.has(data1, key)) {
      return {
        action: 'added',
        key,
        value: data2[key],
      };
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        action: 'changed',
        key,
        value: data1[key],
        updatedValue: data2[key],
      };
    }
    return {
      action: 'unchanged',
      key,
      value: data1[key],
    };
  });

  return allKeys;
};

export { getDifferentObject, getFullPath, getExtension };
