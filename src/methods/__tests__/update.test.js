const testHelpers = require('../../../test/helpers');
const update = require('../update');
const put = require('../put');
const get = require('../get');

describe('update', () => {
  let tableName = 'updateTestTable';
  beforeAll(async () => {
    await testHelpers.createTable(tableName);
    await put(testHelpers.clientPromise, tableName, { id: '1', name: 'Yo' });
  });
  afterAll(async () => {
    await testHelpers.deleteTable(tableName);
  });

  it('can update an item', async () => {
    let { result } = await update(testHelpers.clientPromise, tableName, {
      id: '1',
      name: 'Ya',
    });
    expect(result).toEqual({
      id: '1',
      name: 'Ya',
    });

    let response = await get(testHelpers.clientPromise, tableName, { id: '1' });
    expect(response.result).toEqual({
      id: '1',
      name: 'Ya',
    });
  });
});
