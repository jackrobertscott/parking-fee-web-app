(function() {
  'use strict';

  angular
  .module('webApp')
  .factory('ResourceCompany', ResourceCompany);

  ResourceCompany.$inject = ['$resource', 'ENV'];

  function ResourceCompany($resource, ENV) {
    return $resource(ENV.apiEndpoint+'/api/companies/:id/:action', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
