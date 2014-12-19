module.exports = function(services, serviceName, loadFn) {
  for (var service in services) {
    console.log(services[service].name + '\n' + serviceName + '\n' + loadFn.toString() + '\n');
  }
};
