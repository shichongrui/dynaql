# dynaql

A library for interacting with Amazon's DynamoDB

### Why

Because the parameters DynamoDB expect can be confusing and are easy to forget.

## Usage

```javascript
import dynaql from 'dynaql'

let db = dynaql(AWS_CONFIG)

let { result, meta } = await db.get('my-dynamo-table', { id: '1' })
```

Every method in dynaql returns a dynaql response object which contains two properties, `result` and `meta`. The `result` parameter contains the requested information and `meta` contains any other data that DynamoDB responds with.

## API

#### `get (TableName: string, Key: Object) => Promise<DynaqlResponse>`
`get` will return a single item from a DynamoDB table. The first parameter is the table name and the second parameter is an object containing the item to get's key. The item will be returned in the `result` parameter of the
dynaql response.

Example:

```javascript
import dynaql from 'dynaql'

let db = dynaql(AWS_CONFIG)
let { result, meta } = await db.get('my-dynamo-table', { id: '1' })
```

#### `update (TableName: string, Item: Object) => Promise<DynaqlResponse>`
`update` will update a single item in a DynamoDB table. The first parameter is the table name and the second parameter is an object containing the item to update's key as well as the fields of the item you wish to update. The updated item will be returned in the `result` parameter of the dynaql response.

Example:

```javascript
import dynaql from 'dynaql'

let db = dynaql(AWS_CONFIG)
let { result, meta } = await db.update('my-dynamo-table', { id: '1', username: 'new-username' })
```

#### `query (TableName: string, Key: Object, options?: Object) => Promise<DynaqlResponse>`
`query` will return one to many items from a DynamoDB table or index. The first parameter is the table name and the second parameter is the key to query on. When `dynaql` initializes, it figures out the key schema as well as the key schema of all global secondary indexes on the table. When `query` is called, it will figure out which index to query based on the key that is provided. If you need more control over which index is queried you can pass in an `options` object with an `index` field. Because `query` has the potential of finding more items than can be sent in a single response, the meta object will have a `next` field. Which can be passed into query via the `options` object to get the next page. Currently only equality checks are supported for range keys.

Example:

```javascript
import dynaql from 'dynaql'

let db = dynaql(AWS_CONFIG)
let { result, meta } = await db.query('my-dynamo-table', { account_id: '1' })

let { result: nextResult } = await db.query('my-dynamo-table', { account_id: '1' }, { next: meta.next })
```

#### `put (TableName: string, Item: Object) => Promise<DynaqlResponse>`
`put` will create or replace a single item in a DynamoDB table. The first parameter is the table name and the second parameter is the item to insert. Because DynamoDB doesn't return new values for put operations the `result` parameter of the dynaql response will be the item that is passed into `put`.

Example:

```javascript
import dynaql from 'dynaql'

let db = dynaql(AWS_CONFIG)
let { result, meta } = await db.put('my-dynamo-table', { id: '1', username: 'put-username' })
```

#### `delete (TableName: string, Key: Object) => Promise<DynaqlResponse>`
`delete` will delete a single item in a DynamoDB table. The first parameter is the table name and the second parameter is the key for the item to delete. Because there is no item to return the `result` parameter will be undefined.

Example:

```javascript
import dynaql from 'dynaql'

let db = dynaql(AWS_CONFIG)
let { result, meta } = await db.delete('my-dynamo-table', { id: '1' })
```

#### `getAll (TableName: string, Keys: Array<Object>) => Promise<DynaqlResponse>`
`getAll` will retrieve all items for the provided keys in a DynamoDB table. The first parameter is the table name and the second parameter is an array of keys for the items to get. DynamoDB has a max limit of 100 items that can be retrieved in a single request as well as data transfer limits on a single request so it's possible that not all items will be retrieved in a single request. All of the keys that couldn't be retrieved in a single request will be in the `next` field of the `meta` object in the dynaql response. The `next` field can be passed directly into `getAll` as the second parameter. If all items were retrieved, `next` will be an empty array.

Example:

```javascript
import dynaql from 'dynaql'

let db = dynaql(AWS_CONFIG)
let { result, meta } = await db.getAll('my-dynamo-table', [{ id: '1' }, { id: '2' }, ...])

let { result: nextResult } = await db.getAll('my-dynamo-table', meta.next)
```

#### `writeAll (TableName: string, Items: Array<Object>) => Promise<DynaqlResponse>`
`writeAll` will write all of the given items to a DynamoDB table. The first parameter is the table name and the second parameter is an array of items to write to DynamoDB. DynamoDB has a max limit of 25 items that can be written in a single request as well as data transfer limits on a single request so it's possible that not all items will be written in a single request. All of the items that couldn't be written in a single request will be in the `next` field of the `meta` object in the dynaql response. The `next` field can be passed directly into `writeAll` as the second parameter. If all items were written, `next` will be an empty array.

Example:
    
```javascript
import dynaql from 'dynaql'

let db = dynaql(AWS_CONFIG)
let { result, meta } = await db.writeAll('my-dynamo-table', [{ id: '1', username: 'yo' }, { id: '2', username: 'ya' }, ...])

let { result: nextResult } = await db.writeAll('my-dynamo-table', meta.next)
```

#### `deleteAll (TableName: string, Keys: Array<Object>) => Promise<DynaqlResponse>`
`deleteAll` will delete all of the items for which there are keys provided from a DynamoDB table. The first parameter is the table name and the second parameter is an array of keys to delete from DynamoDB. DynamoDB has a max limit of 25 items that can be deleted in a single request as well as data transfer limits on a single request so it's possible that not all items will be deleted in a single request. All of the items that couldn't be written in a single request will be in the `next` field of the `meta` object in the dynaql response. The `next` field can be passed directly into `deleteAll` as the second parameter. If all items were written, `next` will be an empty array.

Example:

```javascript
import dynaql from 'dynaql'

let db = dynaql(AWS_CONFIG)
let { result, meta } = await db.deleteAll('my-dynamo-table', [{ id: '1' }, { id: '2' }, ...])

let { result: nextResult } = await db.deleteAll('my-dynamo-table', meta.next)
```

#### `createTable (CreateTableParameters: Object) => Promise<DynaqlResponse>`
`createTable` will create a DynamoDB table. The only parameter is a DynamoDB table creation object. Documentation for what this object should look like can be found in the AWS DynamoDB documentation.
http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#createTable-property

Example:

```javascript
import dynaql from 'dynaql'

let db = dynaql(AWS_CONFIG)
let { result, meta } = await db.createTable({ ... })
```

#### `deleteTable (DeleteTableParameters: Object) => Promise<DynaqlResponse>`
`deleteTable` will delete a table from DynamoDB. The only parameter is a DynamoDB table deletion object. Documentation for what this object should look like can be found in the AWS DynamoDB documentation.
http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#deleteTable-property

Example:

```javascript
import dynaql from 'dynaql'

let db = dynaql(AWS_CONFIG)
let { result, meta } = await db.deleteTable({ ... })
```

#### `listTables (ListTableParameters?: Object) => Promise<DynaqlResponse>`
`listTables` will return an array of table names in DynamoDB. The only parameter is an optional options object which can include parameters for the underlying DynamoDB list tables operation. Documentation for what this object should look like can be found in the AWS DynamoDB documentation.
http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#listTables-property

Example:

```javascript
import dynaql from 'dynaql'

let db = dynaql(AWS_CONFIG)
let { result, meta } = await db.listTables()
```

#### `describeTable (TableName: string) => Promise<DynaqlResponse>`
`describeTable` will return the DynamoDB table definition for the requested table. The only parameter is the table name to get the definition for.

Example:

```javascript
import dynaql from 'dynaql'

let db = dynaql(AWS_CONFIG)
let { result, meta } = await db.describeTable('my-dynamo-table')
```

#### `waitFor (TableName: string, TableStatus: 'tableExists' | 'tableNotExists') => Promise<DynaqlResponse>`
`waitFor` will resolve when the table enters the provided state. The value of the `result` field depends on which state is being waited for.

Example:

```javascript
import dynaql from 'dynaql'

let db = dynaql(AWS_CONFIG)
let { result, meta } = await db.waitFor('my-dynamo-table', 'tableExists')
```
