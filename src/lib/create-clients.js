const AWS = require('aws-sdk');
const listTables = require('../methods/list-tables');
const describeTable = require('../methods/describe-table');
const extractIndexes = require('./extract-indexes');

module.exports = async function createClient(config) {
  let client = new AWS.DynamoDB(config);
  let documentClient = new AWS.DynamoDB.DocumentClient({ service: client });

  let result;
  do {
    let data = await listTables(Promise.resolve({ client }));
    if (data.result) {
      result = data.result;
    } else {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  } while (!result);

  if (!result) result = []

  let tableDefinitions = await Promise.all(
    result.map(tableName =>
      describeTable(Promise.resolve({ client }), tableName)
    )
  );

  let indexes = tableDefinitions
    .map(tableDefinition => tableDefinition.result)
    .reduce((collection, definition) => {
      collection[definition.TableName] = extractIndexes(definition);
      return collection;
    }, {});

  return { documentClient, client, indexes };
};
