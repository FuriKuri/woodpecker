var woodpecker = require('../lib/woodpecker')
  , assert = require('assert');

describe('woodpecker', function () {
  it('should return a registered service', function () {
    var myService = function () {
      return {
        name: 'myService'
      }
    };
    woodpecker.service('myService', myService);
    var serviceFromWoodpecker = woodpecker.service('myService');
    assert.equal(serviceFromWoodpecker.name, 'myService');
  });
});
