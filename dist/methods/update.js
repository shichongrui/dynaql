'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.createUpdateExpression = createUpdateExpression;

exports.default = function (client, TableName, Key, update) {
  return new Promise(function (resolve, reject) {
    var params = _extends({
      TableName: TableName,
      Key: Key,
      ReturnValues: 'ALL_NEW'
    }, createUpdateExpression(update));
    console.log(params);
    client.update(params, function (err, data) {
      if (err) return reject(err);
      resolve(data.Attributes);
    });
  });
};

function createUpdateExpression(update) {
  var params = {
    UpdateExpression: '',
    ExpressionAttributeNames: {},
    ExpressionAttributeValues: {}
  };
  var setExpression = '';
  var removeExpression = '';
  Object.keys(update).forEach(function (key) {
    if (update[key] != null) {
      var expressionName = '#' + key;
      var expressionValue = ':' + key;
      if (setExpression === '') {
        setExpression += 'SET ' + expressionName + ' = ' + expressionValue;
      } else {
        setExpression += ', ' + expressionName + ' = ' + expressionValue;
      }
      params.ExpressionAttributeNames[expressionName] = key;
      params.ExpressionAttributeValues[expressionValue] = update[key];
    } else {
      var _expressionName = '#' + key;
      if (removeExpression === '') {
        removeExpression += 'REMOVE ' + _expressionName;
      } else {
        removeExpression += ', ' + _expressionName;
      }
      params.ExpressionAttributeNames[_expressionName] = key;
    }
  });
  params.UpdateExpression = setExpression + ' ' + removeExpression;
  return params;
}