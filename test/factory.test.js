var registry = require('../lib/registry');
var factory = require('../lib/factory');
var assert = require('assert');

describe('factory', function () {
  var myService;

  beforeEach(function() {
    myService = function () {
      return {
        name: 'myService'
      }
    };
    registry.save('service', myService, true);

    registry.save('prototypeService', myService, false);
  });

  afterEach(function(done) {
    registry.clean();
    done();
  });

  it('should create a service object', function() {
    var service = factory.service('service');
    assert.equal(service.name, 'myService');
  });

  it('return the same object if a singleton object was already requested', function() {
    var service = factory.service('service');
    assert.equal(factory.service('service'), service);
  });

  it('return a new object if it is a prototype service', function() {
    var service = factory.service('prototypeService');
    assert.notEqual(factory.service('prototypeService'), service);
  });

  it('resolve dependencies to other services', function() {
    var service = factory.service('service');

    registry.save('needOneService', function(service) {
      this.resolvedService = service;
    });

    var serviceWithOneDep = factory.service('needOneService');
    assert.equal(serviceWithOneDep.resolvedService, service);
  });

  it('should return null if no service was registered', function() {
    assert.equal(factory.service('unknown'), null);
  });

  it('should clean singleton cache if clean is called', function() {
    assert.notEqual(factory.service('service'), null);
    factory.clean();
    registry.clean();
    assert.equal(factory.service('service'), null);
  });
});
