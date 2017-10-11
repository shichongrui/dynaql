const dynaql = require('../index');

describe('dynaql', () => {
  const config = {
    region: 'us-east-1',
    endpoint: process.env.DYNAMO_ENDPOINT,
    accessKeyId: 'dynaql',
    secretAccessKey: 'dynaql',
  };

  it('has all of the functions', () => {
    let db = dynaql(config);

    let methods = Object.keys(db);

    expect(methods).toEqual([
      'get',
      'update',
      'query',
      'put',
      'delete',
      'getAll',
      'writeAll',
      'deleteAll',
      'createTable',
      'deleteTable',
      'listTables',
      'describeTable',
      'waitFor',
    ]);
  });
});
