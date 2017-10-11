// const chunk = require('chunk')

const MAX_BATCH_WRITE = 25;

module.exports = async function(clientPromise, writeType, TableName, items) {
  let { documentClient } = await clientPromise;
  let param = writeType === 'PutRequest' ? 'Item' : 'Key';

  let maxItems = items.slice(0, MAX_BATCH_WRITE);
  let remainingItems = items.slice(MAX_BATCH_WRITE);

  let params = {
    RequestItems: {
      [TableName]: maxItems.map(item => ({
        [writeType]: {
          [param]: item,
        },
      })),
    },
  };

  let {
    UnprocessedItems: unprocessedItems,
    ...meta
  } = await documentClient.batchWrite(params).promise();

  unprocessedItems = (unprocessedItems[TableName] || []).map(item => {
    return item[writeType];
  });

  return {
    result: null,
    meta: {
      ...meta,
      next: [...unprocessedItems, ...remainingItems],
    },
  };
};
