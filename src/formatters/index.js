import getStylish from './stylish.js';
import getPlain from './plain.js';

const createFormat = (tree, formatName = 'stylish') => {
  switch (formatName) {
    case 'stylish':
      return getStylish(tree);
    case 'plain':
      return getPlain(tree);
    case 'json':
      return JSON.stringify(tree);
    default:
      throw new Error(`Format '${formatName}' is not defined.`);
  }
};

export default createFormat;
