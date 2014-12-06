var service = require('../lib/service');
var assert = require('assert');

describe('service', function () {
  var Person = function Person(name, age) {
    this.name = name;
    this.age = age;
  };

  it('should return an object created with "new"', function () {
    var obj = service.construct(Person, [ 'Theo', 28 ]);
    assert.equal(obj.name, 'Theo');
    assert.equal(obj.age, 28);
  });
});
