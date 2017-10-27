const buildQueryExpression = require('../lib/build-query-expression');
const findIndex = require('../lib/find-index');

function buildParamsFromOptions(options) {
  let params = {};

  Object.keys(options).forEach(option => {
    switch (option) {
      case 'next':
        params.ExclusiveStartKey = options.next;
        break;
      case 'limit':
        params.Limit = options.limit;
        break;
      case 'sortForward':
        params.ScanIndexForward = options.sortForward;
        break;
    }
  });

  return params;
}

module.exports = async function(clientPromise, TableName, query, options = {}) {
  let { documentClient, indexes } = await clientPromise;

  let params = {
    TableName,
  };
  let IndexName = options.index || findIndex(indexes[TableName], query);

  if (IndexName && IndexName !== TableName) {
    params.IndexName = IndexName;
  }

  params = {
    ...params,
    ...buildParamsFromOptions(options),
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
