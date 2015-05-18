(function() {
  'use strict';

  angular
  .module('webApp')
  .factory('ResourceVehicle', ResourceVehicle);

  ResourceVehicle.$inject = ['$resource'];

  function ResourceVehicle($resource) {
    return $resource();
  }
})();
