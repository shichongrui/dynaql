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
    if (typeof key[index.range] === 'object') {
      Object.keys(key[index.range]).forEach((rangeKey, i) => {
        params.KeyConditionExpression += ` AND #RANGE ${rangeKey} :RVALUE${i}`;
        params.ExpressionAttributeValues[`:RVALUE${i}`] =
          key[index.range][rangeKey];
      });
    } else {
      params.KeyConditionExpression += ' AND #RANGE = :RVALUE';
      params.ExpressionAttributeValues[':RVALUE'] = key[index.range];
    }
    params.ExpressionAttributeNames['#RANGE'] = index.range;
  }

  return params;
};
