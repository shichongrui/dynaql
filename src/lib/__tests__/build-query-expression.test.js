const buildQueryExpression = require('../build-query-expression');

describe('buildQueryExpression', () => {
  it('builds the hash key', () => {
    let params = buildQueryExpression({ id: '1' }, { hash: 'id' });
    expect(params).toEqual({
      KeyConditionExpression: '#HASH = :HVALUE',
      ExpressionAttributeNames: {
        '#HASH': 'id',
      },
      ExpressionAttributeValues: {
        ':HVALUE': '1',
      },
    });
  });

  it('builds the range key if it is there', () => {
    let params = buildQueryExpression(
      { id: '1', date: '2' },
      { hash: 'id', range: 'date' }
    );
    expect(params).toEqual({
      KeyConditionExpression: '#HASH = :HVALUE AND #RANGE = :RVALUE',
      ExpressionAttributeNames: {
        '#HASH': 'id',
        '#RANGE': 'date',
      },
      ExpressionAttributeValues: {
        ':HVALUE': '1',
        ':RVALUE': '2',
      },
    });
  });

  it('builds custom range key expressions', () => {
    let params = buildQueryExpression(
      {
        id: '1',
        date: {
          '>': '2',
          '>=': '3',
        },
      },
      { hash: 'id', range: 'date' }
    );
    expect(params).toEqual({
      KeyConditionExpression:
        '#HASH = :HVALUE AND #RANGE > :RVALUE0 AND #RANGE >= :RVALUE1',
      ExpressionAttributeNames: {
        '#HASH': 'id',
        '#RANGE': 'date',
      },
      ExpressionAttributeValues: {
        ':HVALUE': '1',
        ':RVALUE0': '2',
        ':RVALUE1': '3',
      },
    });
  });
});
