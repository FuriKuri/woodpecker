var woodpecker = require('woodpecker');

console.log(woodpecker);

woodpecker.service('logger', function() {
  this.log = function(msg) {
    console.log(msg);
  }
});

woodpecker.service('userDAO', function() {
  this.getUser = function(id) {
    return {
      id: id,
      name: 'Theo',
      age: 28
    }
  }
});

woodpecker.service('userService', function(logger, userDAO) {
  this.print = function() {
    logger.log(userDAO.getUser().name);
  }
});

woodpecker.service('userService').print();
