'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (client, TableName, model) {
  return new Promise(function (resolve, reject) {
    var Item = _extends({
      id: _nodeUuid2.default.v4()
    }, model);
    var params = {
      TableName: TableName, Item: Item
    };
    client.put(params, function (err, data) {
      if (err) return reject(err);
      resolve(Item);
    });
  });
};

var _nodeUuid = require('node-uuid');

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }