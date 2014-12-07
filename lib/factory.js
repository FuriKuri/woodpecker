var registry = require('./registry.js');
var service = require('./service');

var factory = module.exports = {};

factory.service = function(name) {
  var serviceFunction = registry.load(name).constructor;
  return service.construct(serviceFunction, []);
};
