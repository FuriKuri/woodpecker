var registry = require('./registry');
var factory = require('./factory');

var woodpecker = module.exports = {};

function loadService(name) {
  return factory.service(name);
}

function saveService(name, service, singleton) {
  registry.save(name, service, singleton);
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
  registry.clean();
  factory.clean();
};
