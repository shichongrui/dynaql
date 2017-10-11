const uuid = require('uuid/v4');
const testHelpers = require('../../../test/helpers');
const query = require('../query');
const writeAll = require('../write-all');

describe('query', () => {
  let tableName = 'queryTestTable';
  let items = [...Array(5)].map(() => ({
    id: uuid(),
    name: 'queryName',
  }));

  beforeAll(async () => {
    await testHelpers.createTable(tableName);
    await writeAll(testHelpers.clientPromise, 'PutRequest', tableName, items);
  });
  afterAll(async () => {
    await testHelpers.deleteTable(tableName);
  });

  it('can query an index', async () => {
    let { result } = await query(testHelpers.clientPromise, tableName, {
      name: 'queryName',
    });
    expect(result.length).toEqual(5);
  });
});
