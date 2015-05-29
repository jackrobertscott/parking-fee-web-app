(function() {
  'use strict';

  angular
  .module('webApp')
  .factory('ResourceInfringement', ResourceInfringement);

  ResourceInfringement.$inject = ['$resource'];

  function ResourceInfringement($resource) {
    return $resource('/api/infringements/:id/:action', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      getFewCompany: {
        method: 'GET',
        isArray: true,
        params: {
          action: 'company'
        }
      }
    });
  }
})();
