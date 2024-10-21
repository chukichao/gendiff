import yaml from 'js-yaml';

const parse = (data, extension) => {
  switch (extension) {
    case '.json':
      return JSON.parse(data);
    case '.yaml':
      return yaml.load(data);
    case '.yml':
      return yaml.load(data);
    default:
      throw new Error(`This file extension '${extension}' is not supported.`);
  }
};

export default parse;
