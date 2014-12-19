var registry = require('./registry');
var util = require('./util');

/**
 * A module that manage services.
 * @module woodpecker
 */

/**
 Save a service
 @param {Function} service - A named constructor function for a service.
 *//**
 Save a service
 @param {string} name - The name under the service will be registered.
 @param {Function} service - A constructor function for a service.
 *//**
 Save a service
 @param {string} name - The name under the service will be registered.
 @param {Function} service - A constructor function for a service.
 @param {boolean} singleton - A flag to determine whether a service is to be constructed on every request.
 *//**
 Returns a service under the registered name
 @returns {object} A service instance.
 */
module.exports.service = function() {
  var args = util.extractArguments(Array.prototype.slice.call(arguments, 0));

  if (args.load) {
    return loadService(args.name);
  } else {
    return saveService(args.name, args.service, args.singleton);
  }
};

/**
 Clean up all services
 */
module.exports.clean = function() {
  registry.clean();
};

function loadService(name) {
  return registry.load(name);
}

function saveService(name, service, singleton) {
  return registry.save(name, service, singleton);
}
