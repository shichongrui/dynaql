'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (config) {
  var indexes = config.indexes;

  var restConfig = _objectWithoutProperties(config, ['indexes']);

  var client = new _awsSdk2.default.DynamoDB.DocumentClient(restConfig);
  var instance = new _awsSdk2.default.DynamoDB(restConfig);

  client.indexes = indexes;
  instance.indexes = indexes;

  return {
    client: instance,
    documentClient: client,

    get: _get2.default.bind(null, client),
    update: _update2.default.bind(null, client),
    query: _query2.default.bind(null, client),
    put: _put2.default.bind(null, client),
    delete: _delete2.default.bind(null, client),
    getAll: _getAll2.default.bind(null, client),

    createTable: _createTable2.default.bind(null, instance),
    deleteTable: _deleteTable2.default.bind(null, instance),
    listTables: _listTables2.default.bind(null, instance),
    describeTable: _describeTable2.default.bind(null, instance)
  };
};

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _get = require('./methods/get');

var _get2 = _interopRequireDefault(_get);

var _update = require('./methods/update');

var _update2 = _interopRequireDefault(_update);

var _query = require('./methods/query');

var _query2 = _interopRequireDefault(_query);

var _put = require('./methods/put');

var _put2 = _interopRequireDefault(_put);

var _delete = require('./methods/delete');

var _delete2 = _interopRequireDefault(_delete);

var _getAll = require('./methods/get-all');

var _getAll2 = _interopRequireDefault(_getAll);

var _createTable = require('./methods/create-table');

var _createTable2 = _interopRequireDefault(_createTable);

var _deleteTable = require('./methods/delete-table');

var _deleteTable2 = _interopRequireDefault(_deleteTable);

var _listTables = require('./methods/list-tables');

var _listTables2 = _interopRequireDefault(_listTables);

var _describeTable = require('./methods/describe-table');

var _describeTable2 = _interopRequireDefault(_describeTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// document client


// normal client