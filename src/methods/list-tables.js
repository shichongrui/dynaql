module.exports = async function(clientPromise, options = {}) {
  let { client } = await clientPromise;
  let { TableNames: result } = await client.listTables(options).promise();
  return { result, meta: {} };
};
