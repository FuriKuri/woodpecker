var parser = require('./parser');
var factory = require('./factory');

var services = {};

function load(name) {
  if (services.hasOwnProperty(name)) {
    var serviceInstance = factory.create(getServiceData)(services[name]);
    services[name].instances.push(serviceInstance);
    return serviceInstance;
  } else {
    return null;
  }
}

module.exports.load = load;

function createAddCallbackFn(serviceData) {
  return {
    callback: function(callback) {
      serviceData.callback = callback;
    }
  }
}

module.exports.save = function(name, service, singleton) {
  if (name === null) {
    name = extractServiceName(service);
  }
  var serviceData = {
    name: name,
    constructor: service,
    singleton: singleton,
    dependencies: parser.parameterNames(service.toString()),
    instances: []
  };
  var alreadyExist = services.hasOwnProperty(name);
  services[name] = serviceData;
  if (alreadyExist) {
    require('./notifier')(services, name, load);
  }
  return createAddCallbackFn(serviceData);
};

module.exports.clean = function() {
  services = {};
  factory.clean();
};

function getServiceData(name) {
  return services[name];
}

function lowerCaseFirstLetter(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

function extractServiceName(service) {
  return lowerCaseFirstLetter(parser.functionName(service));
}
