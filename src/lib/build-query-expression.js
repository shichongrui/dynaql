module.exports = function buildExpression(key, index) {
  let params = {
    KeyConditionExpression: '#HASH = :HVALUE',
    ExpressionAttributeNames: {
      '#HASH': index.hash,
    },
    ExpressionAttributeValues: {
      ':HVALUE': key[index.hash],
    },
  };

  if (key[index.range]) {
    params.KeyConditionExpression += ' AND #RANGE = :RVALUE';
    (params.ExpressionAttributeNames['#RANGE'] = index.range),
      (params.ExpressionAttributeValues[':RVALUE'] = key[index.range]);
  }

  return params;
};
