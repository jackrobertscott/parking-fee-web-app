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
      changePassword: {
        method: 'PUT',
        params: {
          action: 'password'
        }
      },
      update: {
        method: 'PUT'
      },
      promote: {
        method: 'PUT',
        params: {
          action: 'promote'
        }
      },
      demote: {
        method: 'PUT',
        params: {
          action: 'demote'
        }
      }
    });
  }
})();
