const buildQueryExpression = require('../lib/build-query-expression');
const findIndex = require('../lib/find-index');

module.exports = async function(clientPromise, TableName, query, options = {}) {
  let { documentClient, indexes } = await clientPromise;

  let params = {
    TableName,
  };
  let IndexName = options.index || findIndex(indexes[TableName], query);

  if (IndexName && IndexName !== TableName) {
    params.IndexName = IndexName;
  }

  if (options.next) {
    params.ExclusiveStartKey = options.next;
  }

  params = {
    ...params,
    ...buildQueryExpression(query, indexes[TableName][IndexName]),
  };

  let {
    Items: result,
    LastEvaluatedKey: next,
    ...meta
  } = await documentClient.query(params).promise();
  return {
    result,
    meta: {
      ...meta,
      next,
    },
  };
};
