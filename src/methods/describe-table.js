export default function (client, TableName) {
  return new Promise((resolve, reject) => {
    client.describeTable({ TableName }, (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}
