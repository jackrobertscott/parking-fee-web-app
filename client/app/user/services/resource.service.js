(function() {
  'use strict';

  angular
  .module('webApp')
  .factory('ResourceUser', ResourceUser);

  ResourceUser.$inject = ['$resource'];

  function ResourceUser($resource) {
    return $resource('/api/users/:id/:action', {
      id: '@_id'
    }, {
      get: {
        method: 'GET',
        params: {
          id: 'me'
        }
      },
      update: {
        method: 'PUT'
      },
      changePassword: {
        method: 'PUT',
        params: {
          action: 'password'
        }
      },
      addCompanyMember: {
        method: 'POST',
        params: {
          action: 'company'
        }
      },
      removeCompanyMember: {
        method: 'DELETE',
        params: {
          action: 'company'
        }
      },
      getUserVehicles: {
        method: 'GET',
        isArray:true,
        params: {
          action: 'vehicles'
        }
      }
    });
  }
})();
