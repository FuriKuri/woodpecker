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

});
