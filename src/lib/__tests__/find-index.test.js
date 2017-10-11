const findIndex = require('../find-index');

describe('findIndex', () => {
  let indexes = {
    first: {
      hash: 'id',
      range: 'date',
    },
    second: {
      hash: 'username',
    },
    third: {
      hash: 'id',
      range: 'startDate',
    },
    fourth: {
      hash: 'username',
      range: 'startDate',
    },
  };

  it('finds the index schema when it matches both hash and range key', () => {
    expect(findIndex(indexes, { id: '1', date: '2' })).toEqual('first');
  });

  it('finds the index when its just a hash', () => {
    expect(findIndex(indexes, { username: '1' })).toEqual('second');
  });

  it('finds the first hash/range index using the hash key', () => {
    expect(findIndex(indexes, { id: '1' })).toEqual('first');
  });
});
