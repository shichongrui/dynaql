export default function (client, TableName, Key) {
  return new Promise((resolve, reject) => {
    let params = { TableName, Key }
    client.delete(params, (err, data) => {
      if (err) return reject(err)
      resolve()
    })
  })
}
