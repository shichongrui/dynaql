"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (items, size) {
  var itemsCopy = items.slice();
  var newArray = [];

  while (itemsCopy.length) {
    newArray.push(itemsCopy.splice(0, size));
  }
  return newArray;
};