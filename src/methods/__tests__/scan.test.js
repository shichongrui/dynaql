const uuid = require('uuid/v4');
const testHelpers = require('../../../test/helpers');
const scan = require('../scan');
const writeAll = require('../write-all');

describe('scan', () => {
  let tableName = 'scanTestTable';
  let items = [...Array(5)].map(() => ({
    id: uuid(),
    name: 'scanName',
  }));

  beforeAll(async () => {
    await testHelpers.createTable(tableName);
    await writeAll(testHelpers.clientPromise, 'PutRequest', tableName, items);
  });
  afterAll(async () => {
    await testHelpers.deleteTable(tableName);
  });

  it('can scan a table', async () => {
    let { result } = await scan(testHelpers.clientPromise, tableName);
    expect(result.length).toEqual(5);
  });
});
