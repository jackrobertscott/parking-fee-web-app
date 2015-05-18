(function() {
  'use strict';

  angular
  .module('webApp')
  .factory('ResourceVehicle', ResourceVehicle);

  ResourceVehicle.$inject = ['$resource'];

  function ResourceVehicle($resource) {
    return $resource('/api/vehicles/:id', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
