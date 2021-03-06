var parser = require('../lib/parser');
var assert = require('assert');

describe('parser', function () {

  it('should return an empty array if the function has no parameters', function () {
    var parameterNames = parser.parameterNames(function() {});
    assert.deepEqual(parameterNames, []);
  });

  it('should return an array with the parameter name if the function has one parameter', function() {
    var parameterNames = parser.parameterNames(function(firstParameter) { return firstParameter; });
    assert.deepEqual(parameterNames, [ 'firstParameter' ]);
  });

  it('should return an array with two parameter names if the function has two parameter', function() {
    var parameterNames = parser.parameterNames(function(first, sec) { return first + sec; });
    assert.deepEqual(parameterNames, [ 'first', 'sec' ]);
  });

  it('should return an array with five parameter names if the function has five parameter', function() {
    var parameterNames = parser.parameterNames(function(p1, p2, p3, $p4, $$p5) { return [ p1, p2, p3, $p4, $$p5 ]; });
    assert.deepEqual(parameterNames, [ 'p1', 'p2', 'p3', '$p4', '$$p5' ]);
  });

  it('should return parameters for named functions', function() {
    var parameters = parser.parameterNames(function Person(name, age) {
      this.name = name;
      this.age = age;
    });
    assert.deepEqual(parameters, [ 'name', 'age' ]);
  });

  it('should return the name of the named function', function() {
    var name = parser.functionName(function Service() {});
    assert.equal(name, 'Service');
  });

  it('should throw an error if no named function was passed', function() {
    assert.throws(function() {parser.functionName(function() {})}, Error);
  });
});
