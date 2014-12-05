var woodpecker = require('../lib/woodpecker')
  , assert = require('assert');

describe('woodpecker', function () {
  it('should work as expected', function () {
    assert.equal(2, woodpecker.sum(1, 1));
  })
});
