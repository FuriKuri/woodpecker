var parser = require('./parser');
var factory = require('./factory');

var services = {};

module.exports.load = function (name) {
  if (services.hasOwnProperty(name)) {
    return load(services[name]);
  } else {
    return null;
  }
};

module.exports.save = function(name, service, singleton) {
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

module.exports.clean = function() {
  services = {};
  factory.clean();
};

function load(serviceData) {
  return factory.create(getServiceData)(serviceData);
}

function getServiceData(name) {
  return services[name];
}

function lowerCaseFirstLetter(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

function extractServiceName(service) {
  return lowerCaseFirstLetter(parser.functionName(service));
}
