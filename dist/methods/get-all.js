"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function performBatchGet(client, params) {
  return new Promise(function (resolve, reject) {
    client.batchGet(params, function (err, data) {
      if (err) return reject(err);
      resolve(data);
    });
  });
}

exports.default = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(client, TableName, Keys) {
    var params, models, data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            params = {
              RequestItems: _defineProperty({}, TableName, {
                Keys: Keys
              })
            };
            models = [];

          case 2:
            _context.next = 4;
            return performBatchGet(client, params);

          case 4:
            data = _context.sent;

            if (data) {
              models.push.apply(models, _toConsumableArray(data.Responses[TableName]));
              params.RequestItems = data.UnprocessedKeys;
            }

          case 6:
            if (Object.keys(params.RequestItems).length > 0) {
              _context.next = 2;
              break;
            }

          case 7:
            return _context.abrupt("return", models);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();