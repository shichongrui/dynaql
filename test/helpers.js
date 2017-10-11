const createClients = require('../src/lib/create-clients');
const createTable = require('../src/methods/create-table');
const waitFor = require('../src/methods/wait-for');
const deleteTable = require('../src/methods/delete-table');

const clientPromise = createClients({
  region: 'us-east-1',
  endpoint: process.env.DYNAMO_ENDPOINT,
  accessKeyId: 'dynaql',
  secretAccessKey: 'dynaql',
});

async function createTableHelper(TableName) {
  await createTable(clientPromise, {
    TableName,
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
    KeySchema: [
      {
        AttributeName: 'id',
        KeyType: 'HASH',
      },
    ],
    AttributeDefinitions: [
      {
        AttributeName: 'id',
        AttributeType: 'S',
      },
      {
        AttributeName: 'name',
        AttributeType: 'S',
      },
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: 'dynaqlTestIndex',
        KeySchema: [
          {
            AttributeName: 'name',
            KeyType: 'HASH',
          },
        ],
        Projection: {
          ProjectionType: 'ALL',
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1,
        },
      },
    ],
  });

  await waitFor(clientPromise, TableName, 'tableExists');
}

async function deleteTableHelper(TableName) {
  await deleteTable(clientPromise, { TableName });
  await waitFor(clientPromise, TableName, 'tableNotExists');
}

module.exports = {
  createTable: createTableHelper,
  deleteTable: deleteTableHelper,
  clientPromise,
};
