const testHelpers = require('../../../test/helpers');
const writeAll = require('../write-all');
const getAll = require('../get-all');

describe('writeAll', () => {
  let tableName = 'writeAllTestTable';
  beforeAll(async () => {
    await testHelpers.createTable(tableName);
  });
  afterAll(async () => {
    await testHelpers.deleteTable(tableName);
  });

  it('can create new items', async () => {
    let items = [
      {
        id: '1',
        name: 'yo',
      },
      {
        id: '2',
        name: 'ya',
      },
    ];

    await writeAll(testHelpers.clientPromise, 'PutRequest', tableName, items);
    let { result } = await getAll(testHelpers.clientPromise, tableName, [
      { id: '1' },
      { id: '2' },
    ]);
    expect(result).toEqual(items);
  });

  it('can update existing items', async () => {
    let items = [
      {
        id: '1',
        name: 'ya',
      },
      {
        id: '2',
        name: 'yo',
      },
    ];

    await writeAll(testHelpers.clientPromise, 'PutRequest', tableName, items);
    let { result } = await getAll(testHelpers.clientPromise, tableName, [
      { id: '1' },
      { id: '2' },
    ]);
    expect(result).toEqual(items);
  });

  it('can delete items', async () => {
    let items = [{ id: '1' }, { id: '2' }];
    await writeAll(
      testHelpers.clientPromise,
      'DeleteRequest',
      tableName,
      items
    );
    let { result } = await getAll(testHelpers.clientPromise, tableName, items);
    expect(result.length).toEqual(0);
  });

  it('returns next', async () => {
    let items = [...Array(26)].map((_, i) => ({
      id: String(i),
      name: String(i),
    }));
    let { meta } = await writeAll(
      testHelpers.clientPromise,
      'PutRequest',
      tableName,
      items
    );
    expect(meta.next.length).toEqual(1);
  });
});
