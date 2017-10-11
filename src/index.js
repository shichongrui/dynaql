const createClients = require('./lib/create-clients');

// document client
const get = require('./methods/get');
const update = require('./methods/update');
const query = require('./methods/query');
const put = require('./methods/put');
const destroy = require('./methods/delete');
const getAll = require('./methods/get-all');
const writeAll = require('./methods/write-all');

// normal client
const createTable = require('./methods/create-table');
const deleteTable = require('./methods/delete-table');
const listTables = require('./methods/list-tables');
const describeTable = require('./methods/describe-table');
const waitFor = require('./methods/wait-for');

module.exports = function(config) {
  let clientPromise = createClients(config);

  return {
    get: get.bind(null, clientPromise),
    update: update.bind(null, clientPromise),
    query: query.bind(null, clientPromise),
    put: put.bind(null, clientPromise),
    delete: destroy.bind(null, clientPromise),
    getAll: getAll.bind(null, clientPromise),
    writeAll: writeAll.bind(null, clientPromise, 'PutRequest'),
    deleteAll: writeAll.bind(null, clientPromise, 'DeleteRequest'),

    createTable: createTable.bind(null, clientPromise),
    deleteTable: deleteTable.bind(null, clientPromise),
    listTables: listTables.bind(null, clientPromise),
    describeTable: describeTable.bind(null, clientPromise),
    waitFor: waitFor.bind(null, clientPromise),
  };
};
