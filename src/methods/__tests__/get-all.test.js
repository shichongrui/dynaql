const testHelpers = require('../../../test/helpers');
const getAll = require('../get-all');
const writeAll = require('../write-all');
const uuid = require('uuid/v4');

describe('getAll', () => {
  let tableName = 'getAllTestTable';
  let items = [...Array(150)].map(() => ({ id: uuid() }));
  beforeAll(async () => {
    await testHelpers.createTable(tableName);

    let itemsToWrite = items.slice();
    while (itemsToWrite.length) {
      let { meta: { next } } = await writeAll(
        testHelpers.clientPromise,
        'PutRequest',
        tableName,
        itemsToWrite
      );
      itemsToWrite = next;
    }
  });

  afterAll(async () => {
    await testHelpers.deleteTable(tableName);
  });

  it('can get all items less than max batch size', async () => {
    let subItems = items.slice(0, 50);
    let { result, meta } = await getAll(
      testHelpers.clientPromise,
      tableName,
      subItems
    );
    expect(result.length).toEqual(50);
    expect(meta.next.length).toEqual(0);
  });

  it('can get items up to the max batch size', async () => {
    let { result, meta } = await getAll(
      testHelpers.clientPromise,
      tableName,
      items
    );
    expect(result.length).toEqual(100);
    expect(meta.next.length).toEqual(50);
  });
});
