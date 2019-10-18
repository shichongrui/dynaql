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
    fifth: {
      hash: 'startDate',
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

  it('finds the correct hash/range index when it isnt the first in the list', () => {
    expect(findIndex(indexes, { id: '1', startDate: '1234' })).toEqual('third');
  });

  it('finds the index using the hash even when the key is range key in another index', () => {
    expect(findIndex(indexes, { startDate: 1234 })).toEqual('fifth');
  });
});
