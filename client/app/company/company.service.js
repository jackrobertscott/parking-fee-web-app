'use strict';

angular.module('webApp')
  .factory('Company', function () {
    return $resource('/api/users/:id', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  });
