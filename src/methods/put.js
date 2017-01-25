import uuid from 'node-uuid'

export default function (client, TableName, model, options = {}) {
  return new Promise((resolve, reject) => {
    let Item = {
      id: uuid.v4(),
      ...model
    }
    let params = {
      TableName, Item, ...options
    }
    client.put(params, (err, data) => {
      if (err) return reject(err)
      resolve(Item)
    })
  })
}
