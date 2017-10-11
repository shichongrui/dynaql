const testHelpers = require('../../../test/helpers');
const get = require('../get');
const put = require('../put');

describe('get', () => {
  let tableName = 'getTestTable';
  beforeAll(async () => {
    await testHelpers.createTable(tableName);
    await put(testHelpers.clientPromise, tableName, { id: '1' });
  });
  afterAll(async () => {
    await testHelpers.deleteTable(tableName);
  });

  it('can get a single item', async () => {
    let { result } = await get(testHelpers.clientPromise, tableName, {
      id: '1',
    });
    expect(result).toEqual({
      id: '1',
    });
  });
});
