module.exports = function(services, serviceName, loadFn) {
  for (var serviceId in services) {
    var serviceData = services[serviceId];
    if (serviceData.dependencies.indexOf(serviceName) !== -1) {
      if (serviceData.callback !== null) {
        serviceData.instances.forEach(function(instance) {
          serviceData.callback(instance, serviceName, loadFn(serviceName));
        });
      }
    }
  }
};
