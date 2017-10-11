module.exports = function(tableDefinition) {
  let indexes = {
    [tableDefinition.TableName]: {
      hash: (tableDefinition.KeySchema.find(key => key.KeyType === 'HASH') || {}
      ).AttributeName,
      range: (tableDefinition.KeySchema.find(key => key.KeyType === 'RANGE') ||
        {}
      ).AttributeName,
    },
  };

  if (tableDefinition.GlobalSecondaryIndexes) {
    indexes = tableDefinition.GlobalSecondaryIndexes.reduce(
      (tableIndexes, index) => {
        tableIndexes[index.IndexName] = {
          hash: (index.KeySchema.find(key => key.KeyType === 'HASH') || {})
            .AttributeName,
          range: (index.KeySchema.find(key => key.KeyType === 'RANGE') || {})
            .AttributeName,
        };
        return tableIndexes;
      },
      indexes
    );
  }

  return indexes;
};
