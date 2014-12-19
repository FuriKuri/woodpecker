module.exports.extractArguments = function(args) {
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
};

function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}
