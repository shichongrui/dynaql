'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.buildConditionExpression = buildConditionExpression;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function buildConditionExpression(key) {
  var params = {
    expression: '',
    names: {},
    values: {}
  };

  Object.keys(key).forEach(function (field) {
    var expressionName = '#' + field;
    var expressionValue = ':' + field;
    params.expression += expressionName + ' = ' + expressionValue + ' ';
    params.names[expressionName] = field;
    params.values[expressionValue] = key[field];
  });
  return params;
}

function performQuery(client, params) {
  return new Promise(function (resolve, reject) {
    client.query(params, function (err, data) {
      if (err) return reject(err);
      resolve(data);
    });
  });
}

exports.default = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(client, TableName, query, options) {
    var indexedKey, key, keyParams, filterParams, params, models, data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            indexedKey = client.indexes[TableName][options.IndexName];
            key = _defineProperty({}, indexedKey, query[indexedKey]);

            delete query[indexedKey];

            keyParams = buildConditionExpression(key);
            filterParams = buildConditionExpression(query);
            params = _extends({
              TableName: TableName,
              KeyConditionExpression: keyParams.expression || null,
              FilterExpression: filterParams.expression || null
            }, options);


            if (keyParams.expression || filterParams.expression) {
              params.ExpressionAttributeNames = _extends({}, keyParams.names, filterParams.names);
              params.ExpressionAttributeValues = _extends({}, keyParams.values, filterParams.values);
            }

            models = [];

          case 8:
            _context.next = 10;
            return performQuery(client, params);

          case 10:
            data = _context.sent;

            if (data) {
              models.push.apply(models, _toConsumableArray(data.Items));
              params.ExclusiveStartKey = data.LastEvaluatedKey;
            }

          case 12:
            if (params.ExclusiveStartKey) {
              _context.next = 8;
              break;
            }

          case 13:
            return _context.abrupt('return', models);

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();