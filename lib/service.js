var service = module.exports = {};

service.construct = function(service, args) {
  function Service() {
    return service.apply(this, args);
  }
  Service.prototype = service.prototype;
  return new Service();
};