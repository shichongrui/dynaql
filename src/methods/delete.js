module.exports = async function(clientPromise, TableName, Key) {
  let { documentClient } = await clientPromise;
  let params = { TableName, Key };
  let data = await documentClient.delete(params).promise();
  return { result: null, meta: data };
};
