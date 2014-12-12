var registry = require('./registry');
var factory = require('./factory');

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
module.exports.service = function(name, service, singleton) {
  if (isFunction(name) && singleton === undefined) {
    singleton = arguments[1];
    service = arguments[0];
    name = null;
  }

  if (singleton === null || singleton === undefined) {
    singleton = true;
  }

  if (service === null || service === undefined) {
    return loadService(name);
  } else {
    saveService(name, service, singleton);
  }
};

/**
 Clean up all services
 */
module.exports.clean = function() {
  registry.clean();
  factory.clean();
};

function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

function loadService(name) {
  return factory.service(name);
}

function saveService(name, service, singleton) {
  registry.save(name, service, singleton);
}
