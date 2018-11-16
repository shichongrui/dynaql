const uuid = require('uuid/v4');
const testHelpers = require('../../../test/helpers');
const query = require('../query');
const writeAll = require('../write-all');

describe('query', () => {
  let tableName = 'queryTestTable';
  let rangeTableName = 'rangeTestTable';
  let items = [...Array(5)].map(() => ({
    id: uuid(),
    name: 'queryName',
  }));
  let rangeItems = [...Array(5)].map((_, i) => ({
    id: '1',
    number: i,
  }));

  beforeAll(async () => {
    await testHelpers.createTable(tableName);
    await testHelpers.createTableWithRange(rangeTableName);
    await writeAll(testHelpers.clientPromise, 'PutRequest', tableName, items);
    await writeAll(
      testHelpers.clientPromise,
      'PutRequest',
      rangeTableName,
      rangeItems
    );
  });
  afterAll(async () => {
    await testHelpers.deleteTable(tableName);
    await testHelpers.deleteTable(rangeTableName);
  });

  it('can query an index', async () => {
    let { result } = await query(testHelpers.clientPromise, tableName, {
      name: 'queryName',
    });
    expect(result.length).toEqual(5);
  });

  it('accepts a limit', async () => {
    let { result } = await query(
      testHelpers.clientPromise,
      tableName,
      { name: 'queryName' },
      { limit: 1 }
    );
    expect(result.length).toEqual(1);
  });

  it('can sort forward', async () => {
    let { result } = await query(
      testHelpers.clientPromise,
      rangeTableName,
      { id: '1' },
      { sortForward: false }
    );
    expect(result[0].number).toEqual(4);
  });

  it('can do a custom query on the range key', async () => {
    let { result } = await query(testHelpers.clientPromise, rangeTableName, {
      id: '1',
      number: {
        '>': 3,
      },
    });
    expect(result.length).toEqual(1);
    expect(result[0].number).toEqual(4);
  });
});
