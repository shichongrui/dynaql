const testHelpers = require('../../../test/helpers');
const listTables = require('../list-tables');

describe('listTables', () => {
  let tableName = 'listTablesTestTable';
  beforeAll(async () => {
    await testHelpers.createTable(tableName);
  });
  afterAll(async () => {
    await testHelpers.deleteTable(tableName);
  });
  it('lists tables', async () => {
    let { result } = await listTables(testHelpers.clientPromise);
    expect(result).toEqual([tableName]);
  });
});
