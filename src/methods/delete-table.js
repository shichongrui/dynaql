export default function (client, params) {
  return new Promise((resolve, reject) => {
    client.deleteTable(params, (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}
