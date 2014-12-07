var parser = require('./parser');

var services = {};

var registry = module.exports = {};

registry.load = function (name) {
  if (services.hasOwnProperty(name)) {
    return services[name];
  } else {
    return null;
  }
};

registry.save = function(name, service, singleton) {
  services[name] = {
    constructor: service,
    singleton: singleton,
    dependencies: parser.parameterNames(service.toString())
  };
};

registry.clean = function() {
  services = {};
};
