var ServiceProxy = require('../lib/proxy');
var assert = require('assert');

describe('ServiceProxy', function () {

  it('should create a proxy instance', function() {
    assert.notEqual(new ServiceProxy(), null);
  });

  it('should create a proxy instance even if new is missing', function() {
    assert.notEqual(require('../lib/proxy')(), null);
  });

  it('should create delegate methods', function() {
    var proxy = new ServiceProxy();
    var service = {};
    service.name = function() { return 'Name' };
    proxy.service = service;
    assert.equal(proxy.name(), 'Name');
  });

  it('should remove old methods when new service is set', function() {
    var proxy = new ServiceProxy();
    var service = {};
    service.name = function() { return 'Name' };
    proxy.service = service;
    proxy.service = {};
    assert.equal(proxy.name, undefined);
  });

  it('should create delegate values to original service instance', function() {
    var proxy = new ServiceProxy();
    var service = {};
    service.name = 'Old value';
    proxy.service = service;
    assert.equal(proxy.name, 'Old value');
    proxy.name = 'New value';
    assert.equal(service.name, 'New value');
  });
});
