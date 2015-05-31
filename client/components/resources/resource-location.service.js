(function() {
  'use strict';

  angular
  .module('webApp')
  .factory('ResourceLocation', ResourceLocation);

  ResourceLocation.$inject = ['$resource', 'ENV'];

  function ResourceLocation($resource, ENV) {
    return $resource(ENV.apiEndpoint+'/api/locations/:id/:action', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      getCompanyLocations: {
        method: 'GET',
        isArray: true,
        params: {
          action: 'company'
        }
      }
    });
  }
})();
