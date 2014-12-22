var parser = require('./parser');
var factory = require('./factory');
var notifier = require('./notifier');
var ServiceProxy = require('../lib/proxy');

var services = {};

function load(name) {
  if (services.hasOwnProperty(name)) {
    var serviceInstance = factory.create(getServiceData)(services[name]);
    services[name].instances.push(serviceInstance);
    return serviceInstance;
  } else {
    var proxyName = /^\$(.*)\$$/g;
    var result = proxyName.exec(name);
    if (result === null) {
      return null;
    } else {
      var instance = load(result[1]);
      var proxy = new ServiceProxy();
      proxy.service = instance;
      return proxy;
    }
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
    instances: [],
    callback: null
  };
  var alreadyExist = services.hasOwnProperty(name);
  services[name] = serviceData;
  if (alreadyExist) {
    factory.remove(name);
    notifier(services, name, load);
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
