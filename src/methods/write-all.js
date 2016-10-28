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
  let chunks = chunk(Items, MAX_BATCH_WRITE)
  let param = writeType === 'PutRequest' ? 'Item' : 'Key'

  await Promise.all(chunks.map(async (chunk) => {
    let params = {
      RequestItems: {
        [TableName]: chunk.map(item => ({
          [writeType]: {
            [param]: item
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
