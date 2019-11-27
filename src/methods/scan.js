module.exports = async function(clientPromise, TableName, options = {}) {
  let { documentClient } = await clientPromise;
  let params = {
    TableName,
  };

  if (options.limit != null) {
    params.Limit = options.limit;
  }

  if (options.next != null) {
    params.ExclusiveStartKey = options.next;
  }

  let {
    Items: result,
    LastEvaluatedKey: next,
    ...meta
  } = await documentClient.scan(params).promise();

  return {
    result,
    meta: {
      ...meta,
      next,
    },
  };
};
