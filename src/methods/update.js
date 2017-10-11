const createWriteExpression = require('../lib/create-write-expression');

module.exports = async function(clientPromise, TableName, update) {
  let { documentClient, indexes } = await clientPromise;

  let hashKey = indexes[TableName][TableName].hash;
  let rangeKey = indexes[TableName][TableName].range;

  let { [hashKey]: hash, [rangeKey]: range, ...fieldsToUpdate } = update;

  let Key = {
    [hashKey]: hash,
  };
  if (rangeKey) {
    Key[rangeKey] = range;
  }

  let params = {
    TableName,
    Key,
    ReturnValues: 'ALL_NEW',
    ...createWriteExpression(fieldsToUpdate),
  };

  let { Attributes, ...meta } = await documentClient.update(params).promise();
  return { result: Attributes, meta };
};
