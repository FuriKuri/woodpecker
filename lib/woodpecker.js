var prototypeServices = {};
var singletonServices = {};

var woodpecker = module.exports = {};

function getService(name) {
  if (singletonServices.hasOwnProperty(name)) {
    return singletonServices[name];
  } else if (prototypeServices.hasOwnProperty(name)) {
    return singletonServices[name]();
  } else {
    return null;
  }
}

woodpecker.service = function(name, service, singleton) {
  if (singleton === null || singleton === undefined) {
    singleton = true;
  }

  if (service === null || service === undefined) {
    return getService(name);
  }

  if (singleton) {
    singletonServices[name] = service();
  } else {
    prototypeServices[name] = service;
  }
};
