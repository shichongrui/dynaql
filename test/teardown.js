const helpers = require('./helpers');
const listTables = require('../src/methods/list-tables');

async function main() {
  console.log('Performing Teardown');
  let { result } = await listTables(helpers.clientPromise);
  await Promise.all(result.map(tableName => helpers.deleteTable(tableName)));
}

main();
