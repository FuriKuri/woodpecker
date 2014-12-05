var prototypeServices = {};
var singletonServices = {};

var woodpecker = module.exports = {};

function loadService(name) {
  if (singletonServices.hasOwnProperty(name)) {
    return singletonServices[name];
  } else if (prototypeServices.hasOwnProperty(name)) {
    return prototypeServices[name]();
  } else {
    return null;
  }
}

function saveService(name, service, singleton) {
  if (singleton) {
    singletonServices[name] = service();
  } else {
    prototypeServices[name] = service;
  }
}

woodpecker.service = function(name, service, singleton) {
  if (singleton === null || singleton === undefined) {
    singleton = true;
  }

  if (service === null || service === undefined) {
    return loadService(name);
  } else {
    saveService(name, service, singleton);
  }
};

woodpecker.clean = function() {
  prototypeServices = {};
  singletonServices = {};
}
