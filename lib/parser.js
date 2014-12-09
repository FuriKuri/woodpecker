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
