const uuid = require('uuid/v4');

module.exports = async function(clientPromise, TableName, model, options = {}) {
  let { documentClient, indexes } = await clientPromise;
  let Item = {
    [indexes[TableName][TableName].hash]: uuid(),
    ...model,
  };
  let params = {
    TableName,
    Item,
    ...options,
  };
  let meta = await documentClient.put(params).promise();
  return { result: Item, meta };
};
