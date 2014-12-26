var notifier = require('../lib/notifier');
var assert = require('assert');

describe('notifier', function () {
  function load() {
    return {
      name: 'new'
    };
  }

  it('should call the callback function', function() {
    var services = {};
    services.service = {
      name: 'service',
      constructor: function () {},
      singleton: true,
      dependencies: [],
      instances: [],
      callback: null
    };

    services.myService = {
      name: 'myService',
      constructor: function () {},
      singleton: true,
      dependencies: [ 'service' ],
      instances: [ {} ],
      callback: function (obj, name, instance) {
        assert.equal(obj.toString(), {});
        assert.equal(name, 'service');
        assert.equal(instance.name, 'new');
      }
    };

    notifier.notifyInstance(services, 'service', load);
  });

  it('should call nothing if no callback exists', function() {
    var services = {};
    services.service = {
      name: 'service',
      constructor: function () {},
      singleton: true,
      dependencies: [],
      instances: [],
      callback: null
    };

    services.myService = {
      name: 'myService',
      constructor: function () {},
      singleton: true,
      dependencies: [ 'service' ],
      instances: [ {} ],
      callback: null
    };

    notifier.notifyInstance(services, 'service', load);
  });
});
