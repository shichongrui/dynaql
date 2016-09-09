export default function (client, options = {}) {
  return new Promise((resolve, reject) => {
    client.listTables(options, (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}
