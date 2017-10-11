const createWriteExpression = require('../create-write-expression');

describe('createWriteExpression', () => {
  it('works for setting values', () => {
    let update = {
      id: 'asdf',
      username: 'fdsa',
    };
    let params = createWriteExpression(update);
    expect(params.UpdateExpression).toEqual(
      'SET #id = :id, #username = :username'
    );
    expect(params.ExpressionAttributeNames).toEqual({
      '#id': 'id',
      '#username': 'username',
    });
    expect(params.ExpressionAttributeValues).toEqual({
      ':id': 'asdf',
      ':username': 'fdsa',
    });
  });

  it('works for removing values', () => {
    let update = {
      id: null,
      username: null,
    };
    let params = createWriteExpression(update);
    expect(params.UpdateExpression).toEqual('REMOVE #id, #username');
    expect(params.ExpressionAttributeNames).toEqual({
      '#id': 'id',
      '#username': 'username',
    });
  });

  it('can combine both', () => {
    let update = {
      id: 'asdf',
      username: null,
    };
    let params = createWriteExpression(update);
    expect(params.UpdateExpression).toEqual('SET #id = :id REMOVE #username');
    expect(params.ExpressionAttributeNames).toEqual({
      '#id': 'id',
      '#username': 'username',
    });
    expect(params.ExpressionAttributeValues).toEqual({
      ':id': 'asdf',
    });
  });
});
