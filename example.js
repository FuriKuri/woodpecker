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

woodpecker.service('logger', Logger);
woodpecker.service(UserDAO);
woodpecker.service('userService', UserService);

var userService = woodpecker.service('userService');
userService.print();
