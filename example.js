var woodpecker = require('woodpecker');

function Logger() {
  this.log = function(msg) {
    console.log(msg);
  }
}

function UserDAO() {
  this.getUser = function(id) {
    return {
      id: id,
      name: 'Theo',
      age: 28
    }
  }
}

function UserService(logger, userDAO) {
  this.print = function() {
    logger.log(userDAO.getUser().name);
  }
}

woodpecker.service(Logger);
woodpecker.service(UserDAO);
woodpecker.service(UserService);

var userService = woodpecker.service('userService');
userService.print();

function ServiceWithProxy($logger$) {
  this.printHello = function() {
    $logger$.log('Hello');
  }
}

woodpecker.service(ServiceWithProxy);
var serviceWithProxy = woodpecker.service('serviceWithProxy');

serviceWithProxy.printHello();

woodpecker.service(function Logger() {
  this.log = function(msg) {
    console.log(msg.toUpperCase());
  }
});

serviceWithProxy.printHello();
