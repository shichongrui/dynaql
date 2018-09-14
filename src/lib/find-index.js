module.exports = function(indexes, key) {
  let keys = Object.keys(key);
  let indexNames = Object.keys(indexes);

  let index = indexNames.find(indexName => {
    let index = indexes[indexName];
    if (
      keys.length === 2 &&
      keys.includes(index.hash) &&
      keys.includes(index.range)
    ) {
      return true;
    }

    if (keys[0] === index.hash) {
      return true;
    }
  });

  return index;
};
