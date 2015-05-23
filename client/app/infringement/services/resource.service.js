(function() {
  'use strict';

  angular
  .module('webApp')
  .factory('ResourceInfringement', ResourceInfringement);

  ResourceInfringement.$inject = ['$resource'];

  function ResourceInfringement($resource) {
    return $resource('/api/infringement/:id', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
