module.exports = async function(clientPromise, TableName, state) {
  let { client } = await clientPromise;
  let result = await client.waitFor(state, { TableName }).promise();
  return { result, meta: {} };
};
