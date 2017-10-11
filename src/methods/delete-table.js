module.exports = async function(clientPromise, params) {
  let { client, indexes } = await clientPromise;
  let result = await client.deleteTable(params).promise();

  delete indexes[params.TableName];

  return { result, meta: {} };
};
