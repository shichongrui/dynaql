"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (client, TableName, Key) {
  return new Promise(function (resolve, reject) {
    var params = { TableName: TableName, Key: Key };
    client.delete(params, function (err, data) {
      if (err) return reject(err);
      resolve();
    });
  });
};