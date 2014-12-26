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

  it('should call the callback function if a service will be replaced', function () {
    var serviceWithDeps = function(service) {
      this.dep = service;
    };
    registry.save('service', myService, true);
    var oldService = registry.load('service');
    registry.save('serviceWithDeps', serviceWithDeps, true).callback(function (service, name, newInstance) {
      assert.equal(name, 'service');
      assert.notEqual(newInstance, oldService);
    });
    registry.load('serviceWithDeps');
    registry.save('service', myService, true);
  });

  it('should return a proxy service if name starts and ends with "$"', function() {
    registry.save('service', myService, true);
    var proxy = registry.load('$service$');
    assert.equal(proxy.name, 'myService');
    assert.equal(proxy.constructor.name, 'ServiceProxy');
  });

  it('should return a new instances of proxy services', function() {
    registry.save('service', myService, true);
    assert.notEqual(registry.load('$service$'), registry.load('$service$'));
  });
});
