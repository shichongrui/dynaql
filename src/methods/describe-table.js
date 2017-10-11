module.exports = async function(clientPromise, TableName) {
  let { client } = await clientPromise;
  let { Table: result } = await client.describeTable({ TableName }).promise();
  return { result, meta: {} };
};
