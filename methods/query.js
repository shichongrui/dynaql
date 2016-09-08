export function buildConditionExpression (key) {
  let params = {
    expression: '',
    names: {},
    values: {}
  }

  Object.keys(key).forEach(field => {
    let expressionName = `#${field}`
    let expressionValue = `:${field}`
    params.expression += `${expressionName} = ${expressionValue} `
    params.names[expressionName] = field
    params.values[expressionValue] = key[field]
  })
  return params
}

function performQuery (client, params) {
  return new Promise((resolve, reject) => {
    client.query(params, (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}

export default async function (client, TableName, query, options) {
  let indexedKey = client.indexes[TableName][options.IndexName]
  let key = { [indexedKey]: query[indexedKey] }
  delete query[indexedKey]

  let keyParams = buildConditionExpression(key)
  let filterParams = buildConditionExpression(query)

  let params = {
    TableName,
    KeyConditionExpression: keyParams.expression || null,
    FilterExpression: filterParams.expression || null,
    ...options
  }

  if (keyParams.expression || filterParams.expression) {
    params.ExpressionAttributeNames = {...keyParams.names, ...filterParams.names}
    params.ExpressionAttributeValues = {...keyParams.values, ...filterParams.values}
  }

  let models = []
  do {
    let data = await performQuery(client, params)
    if (data) {
      models.push(...data.Items)
      params.ExclusiveStartKey = data.LastEvaluatedKey
    }
  } while (params.ExclusiveStartKey)

  return models
}
