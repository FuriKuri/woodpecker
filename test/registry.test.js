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
    assert.equal(registry.load('service').constructor, myService);
    assert.equal(registry.load('service').singleton, true);
  });

  it('should return a prototype service function', function() {
    registry.save('service', myService, false);
    assert.equal(registry.load('service').constructor, myService);
    assert.equal(registry.load('service').singleton, false);
  });

  it('should return null if no service was registered', function() {
    assert.equal(registry.load('service'), null);
  });

  it('should contains the dependencies', function() {
    registry.save('serviceWithDeps', function(s1, s2) {
      return {
        name: s1.name + s2.name
      }
    });

    assert.deepEqual(registry.load('serviceWithDeps').dependencies, [ 's1', 's2' ]);
  });

  it('should save a function under his name', function() {
    function NamedService() {}
    registry.save(null, NamedService, true);
    assert.equal(NamedService, registry.load('namedService').constructor);
  });
});
