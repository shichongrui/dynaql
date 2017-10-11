const testHelpers = require('../../../test/helpers');
const listTables = require('../list-tables');
const deleteTable = require('../delete-table');
const waitFor = require('../wait-for');
const createClients = require('../../lib/create-clients');

describe('deleteTable', () => {
  it('deletes a table', async () => {
    let tableName = 'deleteTableTestTable';
    await testHelpers.createTable(tableName);

    await deleteTable(testHelpers.clientPromise, { TableName: tableName });
    await waitFor(testHelpers.clientPromise, tableName, 'tableNotExists');

    let { result } = await listTables(testHelpers.clientPromise);
    expect(result.includes(tableName)).toBeFalsy();
  });

  it('deletes table indexes', async () => {
    let tableName = 'deleteTableIndexesTestTable';
    await testHelpers.createTable(tableName);

    let { indexes } = await testHelpers.clientPromise;
    expect(indexes[tableName]).toBeDefined();

    await deleteTable(testHelpers.clientPromise, { TableName: tableName });
    await waitFor(testHelpers.clientPromise, tableName, 'tableNotExists');

    expect(indexes[tableName]).toBeUndefined();
  });
});
