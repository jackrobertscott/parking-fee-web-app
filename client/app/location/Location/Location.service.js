'use strict';

angular.module('webApp')
  .factory('Location', function ($resource) {
    return $resource('/api/locations/:id', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  });
