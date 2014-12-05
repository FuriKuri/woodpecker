var woodpecker = require('../lib/woodpecker');
var assert = require('assert');

describe('woodpecker', function () {
  afterEach(function(done) {
    woodpecker.clean();
    done();
  });

  it('should return a registered service', function () {
    var myService = function () {
      return {
        name: 'myService'
      }
    };
    woodpecker.service('myService', myService);
    var serviceFromWoodpecker = woodpecker.service('myService');
    assert.strictEqual(serviceFromWoodpecker.name, 'myService');
  });

  it('should return a singleton service', function() {
    var myService = function () {
      return {
        name: 'myService'
      }
    };
    woodpecker.service('myService', myService);
    var serviceFromWoodpecker = woodpecker.service('myService');
    assert.strictEqual(woodpecker.service('myService'), serviceFromWoodpecker);
  });

  it('should return a prototype service', function() {
    var myService = function () {
      return {
        name: 'myService'
      }
    };
    woodpecker.service('myService', myService, false);
    var serviceFromWoodpecker = woodpecker.service('myService');
    assert.notStrictEqual(woodpecker.service('myService'), serviceFromWoodpecker);
  });

  it('should return null if no service was registered', function() {
    assert.equal(woodpecker.service('myService'), null);
  });
});
