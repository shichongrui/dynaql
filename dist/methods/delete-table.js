"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (client, params) {
  return new Promise(function (resolve, reject) {
    client.deleteTable(params, function (err, data) {
      if (err) return reject(err);
      resolve(data);
    });
  });
};