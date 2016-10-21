'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chunk = require('../lib/chunk');

var _chunk2 = _interopRequireDefault(_chunk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var MAX_BATCH_WRITE = 25;

function performBatchWrite(client, params) {
  return new Promise(function (resolve, reject) {
    client.batchWrite(params, function (err, data) {
      if (err) return reject(err);
      resolve(data);
    });
  });
}

exports.default = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(client, writeType, TableName, Items) {
    var _this = this;

    var chunks;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            chunks = (0, _chunk2.default)(Items, MAX_BATCH_WRITE);
            _context2.next = 3;
            return Promise.all(chunks.map(function () {
              var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(chunk) {
                var params, data;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        params = {
                          RequestItems: _defineProperty({}, TableName, chunk.map(function (item) {
                            return _defineProperty({}, writeType, {
                              Item: item
                            });
                          }))
                        };

                      case 1:
                        _context.next = 3;
                        return performBatchWrite(client, params);

                      case 3:
                        data = _context.sent;

                        if (data) {
                          params.RequestItems = data.UnprocessedItems;
                        }

                      case 5:
                        if (Object.keys(params.RequestItems).length > 0) {
                          _context.next = 1;
                          break;
                        }

                      case 6:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, _this);
              }));

              return function (_x5) {
                return _ref2.apply(this, arguments);
              };
            }()));

          case 3:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function (_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();