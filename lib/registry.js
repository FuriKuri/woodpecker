var parser = require('./parser');
var factory = require('./factory');
var notifier = require('./notifier');
var ServiceProxy = require('../lib/proxy');

var services = {};
var proxies = {};

function addProxy(name, instance) {
  if (!proxies.hasOwnProperty(name)) {
    proxies[name] = [];
  }
  proxies[name].push(instance);
}

function load(name) {
  if (services.hasOwnProperty(name)) {
    var serviceInstance = factory.create(load)(services[name]);
    services[name].instances.push(serviceInstance);
    return serviceInstance;
  } else {
    var proxyName = /^\$(.*)\$$/g;
    var result = proxyName.exec(name);
    if (result === null) {
      throw new Error('No service with name \'' + name + '\' was registered!');
      // return null;
    } else {
      var proxy = new ServiceProxy();
      var serviceName = result[1];
      proxy.service = load(serviceName);
      addProxy(serviceName, proxy);
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
    notifier.notifyInstance(services, name, load);
    notifier.notifyProxies(proxies[name], loadServiceFn(name));
  }
  return createAddCallbackFn(serviceData);
};

module.exports.clean = function() {
  services = {};
  factory.clean();
};

function lowerCaseFirstLetter(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

function extractServiceName(service) {
  return lowerCaseFirstLetter(parser.functionName(service));
}

function loadServiceFn(serviceName) {
  return function() {
    return load(serviceName);
  }
}
