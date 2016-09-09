"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (client, TableName) {
  return new Promise(function (resolve, reject) {
    client.describeTable({ TableName: TableName }, function (err, data) {
      if (err) return reject(err);
      resolve(data);
    });
  });
};