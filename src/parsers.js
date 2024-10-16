import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parsers = (pathToFile) => {
  const fileExtension = path.extname(pathToFile);
  const fileData = fs.readFileSync(pathToFile, 'utf8');

  switch (fileExtension) {
    case '.json': {
      return JSON.parse(fileData);
    }
    case '.yml': {
      return yaml.load(fileData);
    }
    case '.yaml': {
      return yaml.load(fileData);
    }
    default:
      throw new Error(`${fileExtension} is invalid format`);
  }
};

export default parsers;
