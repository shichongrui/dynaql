const createClients = require('../create-clients');
const testHelpers = require('../../../test/helpers');

const config = {
  region: 'us-east-1',
  endpoint: process.env.DYNAMO_ENDPOINT,
  accessKeyId: 'dynaql',
  secretAccessKey: 'dynaql',
};

describe('createClients', () => {
  beforeAll(async () => {
    await testHelpers.createTable('createClientsTable');
  });

  afterAll(async () => {
    await testHelpers.deleteTable('createClientsTable');
  });

  it('creates the clients', async () => {
    let { documentClient, client } = await createClients(config);

    expect(documentClient).not.toBeNull();
    expect(client).not.toBeNull();
  });

  it('gets the indexes of existing tables', async () => {
    let { indexes } = await createClients(config);

    expect(indexes).toEqual({
      createClientsTable: {
        createClientsTable: {
          hash: 'id',
        },
        dynaqlTestIndex: {
          hash: 'name',
        },
      },
    });
  });
});
