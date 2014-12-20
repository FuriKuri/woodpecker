module.exports = function(services, serviceName, loadFn) {
  Object.getOwnPropertyNames(services).forEach(function(serviceId) {
    var serviceData = services[serviceId];
    notifyInstance(serviceData, serviceName, loadFn);
  });
};

function notifyInstance(serviceData, serviceName, loadFn) {
  if (serviceData.dependencies.indexOf(serviceName) !== -1) {
    if (serviceData.callback !== null) {
      serviceData.instances.forEach(function(instance) {
        serviceData.callback(instance, serviceName, loadFn(serviceName));
      });
    }
  }
}
