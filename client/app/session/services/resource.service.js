(function() {
  'use strict';

  angular
  .module('webApp')
  .factory('ResourceSession', ResourceSession);

  ResourceSession.$inject = ['$resource'];

  function ResourceSession($resource) {
    return $resource('/api/session/:id', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
