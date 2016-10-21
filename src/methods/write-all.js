import chunk from '../lib/chunk'

const MAX_BATCH_WRITE = 25

function performBatchWrite (client, params) {
  return new Promise((resolve, reject) => {
    client.batchWrite(params, (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}

export default async function (client, writeType, TableName, Items) {
  let chunks = chunk(Keys, MAX_BATCH_WRITE)

  await Promise.all(chunks.map(async (chunk) => {
    let params = {
      RequestItems: {
        [TableName]: chunk.map(item => ({
          [writeType]: {
            Item: item
          }
        }))
      }
    }

    do {
      let data = await performBatchWrite(client, params)
      if (data) {
        params.RequestItems = data.UnprocessedItems
      }
    } while (Object.keys(params.RequestItems).length > 0)
  }))
}
