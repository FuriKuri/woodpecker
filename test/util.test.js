var util = require('../lib/util');
var assert = require('assert');

describe('util', function () {
  it('should return an object for loading a service', function () {
    var result = util.extractArguments([ 'service' ]);
    assert.equal(result.load, true);
    assert.equal(result.name, 'service');
  });

  it('should return an object for saving a service', function () {
    var fn = function() {};
    var result = util.extractArguments([ 'service', fn ]);
    assert.equal(result.load, false);
    assert.equal(result.name, 'service');
    assert.equal(result.singleton, true);
    assert.equal(result.service, fn);
  });

  it('should return an object for saving a service for a prototype', function () {
    var fn = function() {};
    var result = util.extractArguments([ 'service', fn, false ]);
    assert.equal(result.load, false);
    assert.equal(result.name, 'service');
    assert.equal(result.singleton, false);
    assert.equal(result.service, fn);
  });

  it('should return an object for saving a service with a named function', function () {
    var fn = function Hi() {};
    var result = util.extractArguments([ fn, false ]);
    assert.equal(result.load, false);
    assert.equal(result.name, null);
    assert.equal(result.singleton, false);
    assert.equal(result.service, fn);
  });
});
