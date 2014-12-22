function ServiceProxy() {
  if (false === (this instanceof ServiceProxy)) {
    console.log('Warning: Proxy constructor called without "new" operator');
    return new ServiceProxy();
  }
}

function removeOwnProperties() {
  Object.keys(this).forEach(function(property) {
    delete this[property];
  }.bind(this));
}

function createProxyMethods(service) {
  Object.keys(service).forEach(function(property) {
    Object.defineProperty(this, property, {
      enumerable: true,
      configurable: true,
      get: function() {
        return service[property];
      },
      set: function(value) {
        service[property] = value;
      }
    });
  }.bind(this));
}

function renewService(service) {
  removeOwnProperties.bind(this)();
  createProxyMethods.bind(this)(service);
}

Object.defineProperty(ServiceProxy.prototype, 'service', {
  enumerable: false,
  configurable: false,
  get: undefined,
  set: renewService
});

module.exports = ServiceProxy;
