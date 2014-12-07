var registry = require('./registry.js');
var service = require('./service');
var singletons = {};

var factory = module.exports = {};

factory.service = function(name) {
  if (singletons.hasOwnProperty(name)) {
    return singletons[name];
  } else {
    var serviceData = registry.load(name);
    var serviceInstance = service.construct(serviceData.constructor, []);
    if (serviceData.singleton) {
      singletons[name] = serviceInstance;
    }
    return serviceInstance;
  }
};
