'use strict';

angular.module('webApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller/:detail', {
      id: '@_id'
    }, {
      changePassword: {
        method: 'PUT',
        params: {
          controller: 'password'
        }
      },
      get: {
        method: 'GET',
        params: {
          id: 'me'
        }
      },
      setCompany: {
        method: 'PUT',
        params: {
          controller: 'company'
        }
      },
      setRole: {
        method: 'PUT',
        params: {
          controller: 'role'
        }
      }
	  });
  });
