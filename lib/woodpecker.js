var defaultContext = {};

var woodpecker = module.exports = {};

woodpecker.service = function(name, service) {
  if (service === null || service === undefined) {
    return defaultContext[name]();
  }
  defaultContext[name] = service;
};