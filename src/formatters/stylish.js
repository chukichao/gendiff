import _ from 'lodash';

const getIndent = (depth, symbol) => {
  const space = '    ';
  if (!symbol) {
    return space.repeat(depth);
  }
  return `${space.repeat(depth)}  ${symbol}`;
};

const getValue = (value, level) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }
    const lines = Object.entries(currentValue).map(
      ([key, val]) => `${getIndent(depth + 1, '  ')}${key}: ${iter(val, depth + 1)}`,
    );
    return ['{', ...lines, `${getIndent(depth + 1)}}`].join('\n');
  };
  return iter(value, level);
};

const getStylish = (tree) => {
  const iter = (object, depth) => {
    const result = object.map((key) => {
      switch (key.action) {
        case 'deleted':
          return `${getIndent(depth, '- ')}${key.key}: ${getValue(key.value, depth)}`;
        case 'added':
          return `${getIndent(depth, '+ ')}${key.key}: ${getValue(key.value, depth)}`;
        case 'nested':
          return `${getIndent(depth, '  ')}${key.key}: ${iter(key.children, depth + 1)}`;
        case 'changed':
          return [
            `${getIndent(depth, '- ')}${key.key}: ${getValue(key.value, depth)}\n${getIndent(
              depth,
              '+ ',
            )}${key.key}: ${getValue(key.updatedValue, depth)}`,
          ];
        default:
          return `${getIndent(depth, '  ')}${key.key}: ${getValue(key.value, depth)}`;
      }
    });
    return ['{', ...result, `${getIndent(depth)}}`].join('\n');
  };

  return iter(tree, 0);
};

export default getStylish;
