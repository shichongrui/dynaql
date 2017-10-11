module.exports = function(indexes, key) {
  let keys = Object.keys(key);
  let indexNames = Object.keys(indexes);

  let bestIndex = indexNames.reduce(
    (best, indexName) => {
      let keysUsed = 0;
      let index = indexes[indexName];
      keys.includes(index.hash) && keysUsed++;
      keys.includes(index.range) && keysUsed++;

      if (keysUsed / keys.length > best.keysUsed) {
        return { indexName, keysUsed };
      } else {
        return best;
      }
    },
    { indexName: '', keysUsed: 0 }
  );

  return bestIndex.indexName;
};
