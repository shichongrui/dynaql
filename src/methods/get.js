export default function (client, TableName, Key) {
  return new Promise((resolve, reject) => {
    let params = {
      TableName,
      Key
    }
    client.get(params, (err, data) => {
      if (err) return reject(err)
      resolve(data && data.Item)
    })
  })
}
