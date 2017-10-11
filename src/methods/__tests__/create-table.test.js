const describeTable = require('../describe-table');
const createTable = require('../create-table');
const waitFor = require('../wait-for');
const createClients = require('../../lib/create-clients');
const testHelpers = require('../../../test/helpers');

describe('createTable', () => {
  it('creates the table', async () => {
    let tableName = 'createTableTestTable';
    await createTable(testHelpers.clientPromise, {
      TableName: tableName,
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
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
    });
    await waitFor(testHelpers.clientPromise, tableName, 'tableExists');

    let { result } = await describeTable(testHelpers.clientPromise, tableName);
    await testHelpers.deleteTable(tableName);

    expect(result).toMatchObject({
      TableName: tableName,
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
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
    });
  });

  it('adds the table schema and indexes to the indexes', async () => {
    let tableName = 'createTableIndexesTestTable';
    await createTable(testHelpers.clientPromise, {
      TableName: tableName,
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
          AttributeName: 'username',
          AttributeType: 'S',
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
      GlobalSecondaryIndexes: [
        {
          IndexName: 'createTableIndexesTestTableIndex',
          KeySchema: [
            {
              KeyType: 'HASH',
              AttributeName: 'username',
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
          Projection: {
            ProjectionType: 'ALL',
          },
        },
      ],
    });
    await waitFor(testHelpers.clientPromise, tableName, 'tableExists');
    let { indexes } = await testHelpers.clientPromise;

    expect(indexes).toMatchObject({
      [tableName]: {
        [tableName]: {
          hash: 'id',
          range: undefined,
        },
        createTableIndexesTestTableIndex: {
          hash: 'username',
          range: undefined,
        },
      },
    });

    await testHelpers.deleteTable(tableName);
  });
});
