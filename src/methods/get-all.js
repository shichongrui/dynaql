const MAX_BATCH_GET = 100;

module.exports = async function(clientPromise, TableName, Keys) {
  let { documentClient } = await clientPromise;

  let maxKeys = Keys.slice(0, MAX_BATCH_GET);
  let remainingKeys = Keys.slice(MAX_BATCH_GET);

  let params = {
    RequestItems: {
      [TableName]: {
        Keys: maxKeys,
      },
    },
  };

  let response = await documentClient.batchGet(params).promise();

  let {
    Responses: { [TableName]: result },
    UnprocessedKeys: { [TableName]: unprocessedKeys },
    ...meta
  } = response;

  let next = unprocessedKeys == null ? [] : unprocessedKeys;
  next.push(...remainingKeys);

  return {
    result,
    meta: {
      ...meta,
      next,
    },
  };
};
