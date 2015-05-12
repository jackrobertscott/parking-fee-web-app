'use strict';

angular.module('webApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
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
      removeCompany: {
        method: 'DELETE',
        params: {
          controller: 'company'
        }
      },
      addVehicle: {
        method: 'PUT',
        params: {
          controller: 'vehicle'
        }
      },
      removeVehicle: {
        method: 'DELETE',
        params: {
          controller: 'vehicle'
        }
      },
      promote: {
        method: 'PUT',
        params: {
          controller: 'promote'
        }
      },
      demote: {
        method: 'PUT',
        params: {
          controller: 'demote'
        }
      }
	  });
  });
