export function createUpdateExpression (update) {
  let params = {
    UpdateExpression: '',
    ExpressionAttributeNames: {},
    ExpressionAttributeValues: {}
  }
  let setExpression = ''
  let removeExpression = ''
  Object.keys(update).forEach(key => {
    if (update[key] != null) {
      let expressionName = `#${key}`
      let expressionValue = `:${key}`
      if (setExpression === '') {
        setExpression += `SET ${expressionName} = ${expressionValue}`
      } else {
        setExpression += `, ${expressionName} = ${expressionValue}`
      }
      params.ExpressionAttributeNames[expressionName] = key
      params.ExpressionAttributeValues[expressionValue] = update[key]
    } else {
      let expressionName = `#${key}`
      if (removeExpression === '') {
        removeExpression += `REMOVE ${expressionName}`
      } else {
        removeExpression += `, ${expressionName}`
      }
      params.ExpressionAttributeNames[expressionName] = key
    }
  })
  params.UpdateExpression = `${setExpression} ${removeExpression}`
  return params
}

export default function (client, TableName, Key, update) {
  return new Promise((resolve, reject) => {
    let params = {
      TableName,
      Key,
      ReturnValues: 'ALL_NEW',
      ...createUpdateExpression(update)
    }
    console.log(params)
    client.update(params, (err, data) => {
      if (err) return reject(err)
      resolve(data.Attributes)
    })
  })
}
