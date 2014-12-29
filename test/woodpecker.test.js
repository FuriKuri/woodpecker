var woodpecker = require('../lib/woodpecker');
var assert = require('assert');

describe('woodpecker', function () {
  var myService;

  beforeEach(function() {
    myService = function () {
      return {
        name: 'myService'
      }
    };
  });

  afterEach(function(done) {
    woodpecker.clean();
    done();
  });

  it('should return a registered service', function () {
    woodpecker.service('myService', myService);
    var serviceFromWoodpecker = woodpecker.service('myService');
    assert.strictEqual(serviceFromWoodpecker.name, 'myService');
  });

  it('should return a singleton service', function() {
    woodpecker.service('myService', myService);
    var serviceFromWoodpecker = woodpecker.service('myService');
    assert.strictEqual(woodpecker.service('myService'), serviceFromWoodpecker);
  });

  it('should return a prototype service', function() {
    woodpecker.service('myService', myService, false);
    var serviceFromWoodpecker = woodpecker.service('myService');
    assert.notStrictEqual(woodpecker.service('myService'), serviceFromWoodpecker);
  });

  it('should throw an error if no service was registered', function() {
    assert.throws(function () {woodpecker.service('myService')}, Error);
  });

  it('should return a function if a named function was registered', function() {
    function PersonService() {
      this.name = 'NamedFunction';
    }
    woodpecker.service(PersonService);
    assert.equal(woodpecker.service('personService').name, 'NamedFunction');
  });

  it('should return a registered service with a callback function', function () {
    woodpecker.service('myService', myService).callback(function() {});
    var serviceFromWoodpecker = woodpecker.service('myService');
    assert.strictEqual(serviceFromWoodpecker.name, 'myService');
  });

  it('should load a service with proxy', function() {
    function ServiceWithProxy($logger$) {
      this.hello = function() {
        return $logger$.log('Hello');
      }
    }
    woodpecker.service('logger', function() {
      this.log = function(msg) {
        return msg.toLowerCase();
      }
    });
    woodpecker.service(ServiceWithProxy);
    var serviceWithProxy = woodpecker.service('serviceWithProxy');
    assert.equal(serviceWithProxy.hello(), 'hello');

    woodpecker.service('logger', function() {
      this.log = function(msg) {
        return msg.toUpperCase();
      }
    });

    assert.equal(serviceWithProxy.hello(), 'HELLO');

  });
});
