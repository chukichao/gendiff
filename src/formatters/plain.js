const getString = (value) => {
  switch (typeof value) {
    case 'object':
      return value == null ? value : '[complex value]';
    case 'string':
      return `'${value}'`;
    default:
      return value;
  }
};

const getPlain = (tree) => {
  const iter = (object, path) => {
    const result = object.map((key) => {
      const fullKey = `${path}${key.key}`;
      if (key.action === 'deleted') {
        return `Property '${fullKey}' was removed`;
      }
      if (key.action === 'added') {
        return `Property '${fullKey}' was added with value: ${getString(key.newValue)}`;
      }
      if (key.action === 'nested') {
        return iter(key.children, `${fullKey}.`);
      }
      if (key.action === 'changed') {
        return `Property '${fullKey}' was updated. From ${getString(key.oldValue)} to ${getString(
          key.newValue,
        )}`;
      }
      return null;
    });
    return result.filter((item) => item != null).join('\n');
  };

  return iter(tree, '');
};

export default getPlain;
