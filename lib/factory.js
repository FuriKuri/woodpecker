var registry = require('./registry');
var service = require('./service');
var singletons = {};

var factory = module.exports = {};

factory.service = function load(name) {
  if (singletons.hasOwnProperty(name)) {
    return singletons[name];
  } else {
    var serviceData = registry.load(name);
    if (serviceData === null) {
      return null;
    }
    var serviceInstance = service.construct(serviceData.constructor, serviceData.dependencies.map(load));
    if (serviceData.singleton) {
      singletons[name] = serviceInstance;
    }
    return serviceInstance;
  }
};

factory.clean = function() {
  singletons = {};
};
