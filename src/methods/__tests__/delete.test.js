const testHelpers = require('../../../test/helpers');
const deleteItem = require('../delete');
const put = require('../put');
const get = require('../get');

describe('delete', () => {
  let tableName = 'deleteTestTable';
  beforeAll(async () => {
    await testHelpers.createTable(tableName);
  });
  afterAll(async () => {
    await testHelpers.deleteTable(tableName);
  });

  it('deletes an item', async () => {
    await put(testHelpers.clientPromise, tableName, { id: '1', name: 'asdf' });
    let results = await get(testHelpers.clientPromise, tableName, { id: '1' });

    expect(results.result).toBeDefined();

    await deleteItem(testHelpers.clientPromise, tableName, { id: '1' });
    results = await get(testHelpers.clientPromise, tableName, { id: '1' });

    expect(results.result).not.toBeDefined();
  });
});
