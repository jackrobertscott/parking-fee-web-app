(function() {
  'use strict';

  angular
  .module('webApp')
  .factory('ResourceVehicle', ResourceVehicle);

  ResourceVehicle.$inject = ['$resource'];

  function ResourceVehicle($resource) {
    return $resource('/api/vehicles/:id/:action', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      getUserVehicles: {
        method: 'GET',
        isArray: true,
        params: {
          action: 'user'
        }
      }
    });
  }
})();
