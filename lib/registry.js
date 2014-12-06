var prototypeServices = {};
var singletonServices = {};

var registry = module.exports = {};

registry.load = function (name) {
  if (singletonServices.hasOwnProperty(name)) {
    return singletonServices[name];
  } else if (prototypeServices.hasOwnProperty(name)) {
    return prototypeServices[name];
  } else {
    return null;
  }
};

registry.save = function(name, service, singleton) {
  if (singleton) {
    singletonServices[name] = service;
  } else {
    prototypeServices[name] = service;
  }
};

registry.clean = function() {
  prototypeServices = {};
  singletonServices = {};
};
