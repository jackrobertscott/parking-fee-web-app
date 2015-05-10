'use strict';

angular.module('webApp')
  .factory('Vehicle', function ($resource) {
    return $resource('/api/vehicles/:id', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  });
