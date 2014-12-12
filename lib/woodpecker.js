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
module.exports.service = function() {
  var args = extractArguments(Array.prototype.slice.call(arguments, 0));

  if (args.load) {
    return loadService(args.name);
  } else {
    saveService(args.name, args.service, args.singleton);
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

function extractArguments(args) {
  var singleton;
  var name;
  var service;

  if (isFunction(args[0]) && singleton === undefined) {
    name = null;
    service = args[0];
    singleton = args[1];
  } else {
    name = args[0];
    service = args[1];
    singleton = args[2];
  }

  if (singleton === null || singleton === undefined) {
    singleton = true;
  }

  if (service === null || service === undefined) {
    return {
      load: true,
      name: name
    }
  } else {
    return {
      load: false,
      name: name,
      service: service,
      singleton: singleton
    }
  }
}
