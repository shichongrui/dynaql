const testHelpers = require('../../../test/helpers');
const waitFor = require('../wait-for');
const createTable = require('../create-table');
const deleteTable = require('../delete-table');

describe('waitFor', () => {
  let tableName = 'waitForTestTable';
  it('can wait for table states', async () => {
    await createTable(testHelpers.clientPromise, {
      TableName: tableName,
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
      ],
    });
    await waitFor(testHelpers.clientPromise, tableName, 'tableExists');

    await deleteTable(testHelpers.clientPromise, { TableName: tableName });
    await waitFor(testHelpers.clientPromise, tableName, 'tableNotExists');
  });
});
