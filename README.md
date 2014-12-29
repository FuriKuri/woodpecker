# woodpecker

A lightweight dependency injection framework

[![build status](https://secure.travis-ci.org/FuriKuri/woodpecker.png)](http://travis-ci.org/FuriKuri/woodpecker)
[![Code Climate](https://codeclimate.com/github/FuriKuri/woodpecker/badges/gpa.svg)](https://codeclimate.com/github/FuriKuri/woodpecker)
[![Test Coverage](https://codeclimate.com/github/FuriKuri/woodpecker/badges/coverage.svg)](https://codeclimate.com/github/FuriKuri/woodpecker)
## Installation

```
npm install woodpecker --save
```

## Usage
### Register a service
```javascript
var woodpecker = require('woodpecker');

// Simple logger service function
function Logger() {
  this.log = function(msg) {
    console.log(msg);
  }
}

// The service will be registered under the name 'logger'. Works only with named function
woodpecker.service(Logger);

// Use custom names
woodpecker.service('myService', Logger);
```

### Request a service
```javascript
// Request service
var serviceInstance = woodpecker.service('logger');

// Now the service can be used
serviceInstance.log('Hello World');
```

### Using the dependency injection
```javascript
// Create some functions
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

// The required service instances will be automatically injected, if the parameter names match the registered services
function UserService(logger, userDAO) {
  this.print = function() {
    logger.log(userDAO.getUser().name);
  }
}

// Register the services
woodpecker.service(Logger);
woodpecker.service(UserDAO);
woodpecker.service(UserService);

// Load the service. Required services (logger and userDAO) will be injected
var userService = woodpecker.service('userService');

// Use the service
userService.print();
```

### Using proxy services
Proxy service always holds the current registered service. To get an proxy instance surround the service name with '$' (e.g. $logger$ for a service named 'service').
```javascript
// Register a service which use a service named looger
function ServiceWithProxy($logger$) {
  this.hello = function() {
    return $logger$.log('Hello');
  }
}

// Register a service named logger
woodpecker.service('logger', function() {
  this.log = function(msg) {
    console.log(msg.toLowerCase());
  }
});

// Use the service
var serviceWithProxy = woodpecker.service('serviceWithProxy');
serviceWithProxy.hello() // prints 'hello' on console

// Register a new service named logger
woodpecker.service('logger', function() {
  this.log = function(msg) {
    console.log(msg.toUpperCase());
  }
});

serviceWithProxy.hello() // prints 'HELLO' on console

```
## Credits
[Theo Pack](https://github.com/FuriKuri/)
