"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (client) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return new Promise(function (resolve, reject) {
    client.listTables(options, function (err, data) {
      if (err) return reject(err);
      resolve(data);
    });
  });
};