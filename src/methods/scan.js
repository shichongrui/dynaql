module.exports = async function(clientPromise, TableName) {
  let { documentClient } = await clientPromise;
  let params = {
    TableName,
  };

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
