const extractIndexes = require('../extract-indexes');

describe('extractIndexes', () => {
  it('gets the tables key schema', () => {
    let params = {
      TableName: 'extractTable',
      KeySchema: [
        {
          KeyType: 'HASH',
          AttributeName: 'id',
        },
        {
          KeyType: 'RANGE',
          AttributeName: 'date',
        },
      ],
    };

    expect(extractIndexes(params)).toEqual({
      extractTable: {
        hash: 'id',
        range: 'date',
      },
    });
  });

  it('gets the tables global secondary indexes', () => {
    let params = {
      TableName: 'extractTable',
      KeySchema: [
        {
          KeyType: 'HASH',
          AttributeName: 'id',
        },
        {
          KeyType: 'RANGE',
          AttributeName: 'date',
        },
      ],
      GlobalSecondaryIndexes: [
        {
          IndexName: 'extractTableIndex',
          KeySchema: [
            {
              KeyType: 'HASH',
              AttributeName: 'id',
            },
            {
              KeyType: 'RANGE',
              AttributeName: 'date',
            },
          ],
        },
      ],
    };

    expect(extractIndexes(params)).toEqual({
      extractTable: {
        hash: 'id',
        range: 'date',
      },
      extractTableIndex: {
        hash: 'id',
        range: 'date',
      },
    });
  });
});
