module.exports = async function(clientPromise, TableName, Key) {
  let { documentClient } = await clientPromise;
  let params = {
    TableName,
    Key,
  };
  let { Item: result, ...meta } = await documentClient.get(params).promise();
  return { result, meta };
};
