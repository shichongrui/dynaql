const testHelpers = require('../../../test/helpers');
const put = require('../put');
const get = require('../get');

describe('put', () => {
  let tableName = 'putTestTable';
  beforeAll(async () => {
    await testHelpers.createTable(tableName);
  });
  afterAll(async () => {
    await testHelpers.deleteTable(tableName);
  });

  it('can put an item', async () => {
    await put(testHelpers.clientPromise, tableName, { id: '1', name: 'yo' });
    let { result } = await get(testHelpers.clientPromise, tableName, {
      id: '1',
    });

    expect(result).toEqual({
      id: '1',
      name: 'yo',
    });
  });

  it('can create an id if one is not passed in', async () => {
    let { result: item } = await put(testHelpers.clientPromise, tableName, {
      name: 'ya',
    });
    expect(item.id).toBeDefined();

    let { result } = await get(testHelpers.clientPromise, tableName, {
      id: item.id,
    });
    expect(result).toEqual({
      id: item.id,
      name: 'ya',
    });
  });
});
