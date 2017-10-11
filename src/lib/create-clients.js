const AWS = require('aws-sdk');
const listTables = require('../methods/list-tables');
const describeTable = require('../methods/describe-table');
const extractIndexes = require('./extract-indexes');

module.exports = async function createClient(config) {
  let client = new AWS.DynamoDB(config);
  let documentClient = new AWS.DynamoDB.DocumentClient({ service: client });

  let { result } = await listTables(Promise.resolve({ client }));

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
