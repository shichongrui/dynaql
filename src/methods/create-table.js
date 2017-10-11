const extractIndexes = require('../lib/extract-indexes');

module.exports = async function(clientPromise, params) {
  let { client, indexes } = await clientPromise;
  let result = await client.createTable(params).promise();

  indexes[params.TableName] = extractIndexes(params);

  return { result, meta: {} };
};
