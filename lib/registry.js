var parser = require('./parser');

var services = {};

var registry = module.exports = {};

function lowerCaseFirstLetter(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

function extractServiceName(service) {
  return lowerCaseFirstLetter(parser.functionName(service));
}

registry.load = function (name) {
  if (services.hasOwnProperty(name)) {
    return services[name];
  } else {
    return null;
  }
};

registry.save = function(name, service, singleton) {
  if (name === null) {
    name = extractServiceName(service);
  }
  services[name] = {
    constructor: service,
    singleton: singleton,
    dependencies: parser.parameterNames(service.toString())
  };
};

registry.clean = function() {
  services = {};
};
