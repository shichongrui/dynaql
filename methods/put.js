import uuid from 'node-uuid'

export default function (client, TableName, model) {
  return new Promise((resolve, reject) => {
    let Item = {
      id: uuid.v4(),
      ...model
    }
    let params = {
      TableName, Item
    }
    client.put(params, (err, data) => {
      if (err) return reject(err)
      resolve(Item)
    })
  })
}
