(function() {
  'use strict';

  angular
  .module('webApp')
  .factory('ResourceLocation', ResourceLocation);

  ResourceLocation.$inject = ['$resource'];

  function ResourceLocation($resource) {
    return $resource('/api/locations/:id', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
