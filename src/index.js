import AWS from 'aws-sdk'

// document client
import get from './methods/get'
import update from './methods/update'
import query from './methods/query'
import put from './methods/put'
import destroy from './methods/delete'
import getAll from './methods/get-all'

// normal client
import createTable from './methods/create-table'
import deleteTable from './methods/delete-table'
import listTables from './methods/list-tables'
import describeTable from './methods/describe-table'

export default function (config) {
  let {indexes, ...restConfig} = config
  let client = new AWS.DynamoDB.DocumentClient(restConfig)
  let instance = new AWS.DynamoDB(restConfig)

  client.indexes = indexes
  instance.indexes = indexes

  return {
    client: instance,
    documentClient: client,
    
    get: get.bind(null, client),
    update: update.bind(null, client),
    query: query.bind(null, client),
    put: put.bind(null, client),
    delete: destroy.bind(null, client),
    getAll: getAll.bind(null, client),

    createTable: createTable.bind(null, instance),
    deleteTable: deleteTable.bind(null, instance),
    listTables: listTables.bind(null, instance),
    describeTable: describeTable.bind(null, instance)
  }
}
