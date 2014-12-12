var parser = module.exports = {};

parser.parameterNames = function(fn) {
  var functionNamesRegex = /^\s*function[^\(]*\(\s*([^\\)]+)\s*\)/g;
  var result = functionNamesRegex.exec(fn.toString());
  if (result === null) {
    return [];
  } else {
    return result[1].split(/\s*,\s*/);
  }
};

parser.functionName = function(fn) {
  var functionNameRegex = /^\s*function\s*(\w[^\(]*)+\(/g;
  var result = functionNameRegex.exec(fn.toString());
  if (result === null) {
    throw new Error();
  } else {
    return result[1];
  }
};
