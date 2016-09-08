function performBatchGet (client, params) {
  return new Promise((resolve, reject) => {
    client.batchGet(params, (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}

export default async function (client, TableName, Keys) {
  let params = {
    RequestItems: {
      [TableName]: {
        Keys
      }
    }
  }

  let models = []
  do {
    let data = await performBatchGet(client, params)
    if (data) {
      models.push(...data.Responses[TableName])
      params.RequestItems = data.UnprocessedKeys
    }
  } while (Object.keys(params.RequestItems).length > 0)
  return models
}
