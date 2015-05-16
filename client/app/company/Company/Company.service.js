'use strict';

angular.module('webApp')
  .factory('Company', function ($resource) {
    return $resource('/api/companies/:id', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  });
