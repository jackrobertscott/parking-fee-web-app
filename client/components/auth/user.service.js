'use strict';

angular.module('webApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller/:detail', {
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
          controller: 'password'
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
