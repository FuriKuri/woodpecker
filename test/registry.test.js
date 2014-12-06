var registry = require('../lib/registry');
var assert = require('assert');

describe('registry', function () {
  var myService;

  beforeEach(function() {
    myService = function () {
      return {
        name: 'myService'
      }
    };
  });

  afterEach(function(done) {
    registry.clean();
    done();
  });

  it('should return a singleton service function', function() {
    registry.save('service', myService, true);
    assert.equal(registry.load('service'), myService);
  });

  it('should return a prototype service function', function() {
    registry.save('service', myService, false);
    assert.equal(registry.load('service'), myService);
  });

  it('should return null if no service was registered', function() {
    assert.equal(registry.load('service'), null);
  });
});
