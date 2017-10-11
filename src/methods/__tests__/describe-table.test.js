const testHelpers = require('../../../test/helpers');
const describeTable = require('../describe-table');

describe('describeTable', () => {
  let tableName = 'describeTableTestTable';
  beforeAll(async () => {
    await testHelpers.createTable(tableName);
  });
  afterAll(async () => {
    await testHelpers.deleteTable(tableName);
  });

  it('gets the table definition', async () => {
    let { result } = await describeTable(testHelpers.clientPromise, tableName);
    expect(result.TableName).toEqual(tableName);
  });
});
