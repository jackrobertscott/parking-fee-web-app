(function() {
  'use strict';

  angular
  .module('webApp')
  .factory('ResourceCompany', ResourceCompany);

  ResourceCompany.$inject = ['$resource'];

  function ResourceCompany($resource) {
    return $resource('/api/companies/:id/:action', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      getMembers: {
        method: 'GET',
        params: {
          action: 'members'
        }
      },
      getCompanyLocations: {
        method: 'GET',
        params: {
          action: 'locations'
        }
      }
    });
  }
})();
