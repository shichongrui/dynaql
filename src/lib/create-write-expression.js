module.exports = function createWriteExpression(update) {
  let params = {
    UpdateExpression: '',
    ExpressionAttributeNames: {},
    ExpressionAttributeValues: {},
  };
  let expressions = Object.keys(update).reduce(
    (expressions, key) => {
      let expressionName = `#${key}`;
      if (update[key] != null) {
        let expressionValue = `:${key}`;
        expressions.set.push(`${expressionName} = ${expressionValue}`);
        params.ExpressionAttributeNames[expressionName] = key;
        params.ExpressionAttributeValues[expressionValue] = update[key];
      } else {
        expressions.remove.push(expressionName);
        params.ExpressionAttributeNames[expressionName] = key;
      }

      return expressions;
    },
    { set: [], remove: [] }
  );
  let expression = [];
  if (expressions.set.length) {
    expression.push(`SET ${expressions.set.join(', ')}`);
  }
  if (expressions.remove.length) {
    expression.push(`REMOVE ${expressions.remove.join(', ')}`);
  }
  params.UpdateExpression = expression.join(' ');
  return params;
};
