var parser = require('./parser');
var service = require('./service');

var services = {};
var singletons = {};

var registry = module.exports = {};

function lowerCaseFirstLetter(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

function extractServiceName(service) {
  return lowerCaseFirstLetter(parser.functionName(service));
}

registry.load = function (name) {
  if (services.hasOwnProperty(name)) {
    return load(services[name]);
  } else {
    return null;
  }
};

registry.save = function(name, service, singleton) {
  if (name === null) {
    name = extractServiceName(service);
  }
  services[name] = {
    name: name,
    constructor: service,
    singleton: singleton,
    dependencies: parser.parameterNames(service.toString())
  };
};

registry.clean = function() {
  services = {};
  singletons = {};
};

function load(serviceData) {
  if (singletons.hasOwnProperty(serviceData.name)) {
    return singletons[serviceData.name];
  } else {
    if (serviceData === null) {
      return null;
    }
    var serviceInstance = service.construct(serviceData.constructor, serviceData.dependencies.map(getServiceData).map(load));
    if (serviceData.singleton) {
      singletons[serviceData.name] = serviceInstance;
    }
    return serviceInstance;
  }
}

function getServiceData(name) {
  return services[name];
}