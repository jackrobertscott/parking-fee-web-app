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
      getCompanyMembers: {
        method: 'GET',
        isArray: true,
        params: {
          action: 'members'
        }
      },
      getCompanyLocations: {
        method: 'GET',
        isArray: true,
        params: {
          action: 'locations'
        }
      }
    });
  }
})();
