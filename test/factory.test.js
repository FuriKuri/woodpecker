var factory = require('../lib/factory');
var assert = require('assert');

describe('factory', function () {
  var Person = function Person(name, age) {
    this.name = name;
    this.age = age;
  };

  it('should return an object created with "new"', function () {
    var obj = factory.construct(Person, [ 'Theo', 28 ]);
    assert.equal(obj.name, 'Theo');
    assert.equal(obj.age, 28);
  });
});
