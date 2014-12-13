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

  it('should return a singleton service', function() {
    registry.save('service', myService, true);
    assert.equal(registry.load('service'), registry.load('service'));
  });

  it('should return a prototype service function', function() {
    registry.save('service', myService, false);
    assert.notEqual(registry.load('service'), registry.load('service'));
  });

  it('should return null if no service was registered', function() {
    assert.equal(registry.load('service'), null);
  });

  it('should save a function under his name', function() {
    function NamedService() {}
    registry.save(null, NamedService, true);
    assert.equal(NamedService, registry.load('namedService').constructor);
  });

  it('should return a service with his dependencies', function() {
    var serviceWithDeps = function(service) {
      this.dep = service;
    };
    registry.save('service', myService, true);
    registry.save('serviceWithDeps', serviceWithDeps, true);
    assert.equal(registry.load('serviceWithDeps').dep.name, 'myService');
  });
});
