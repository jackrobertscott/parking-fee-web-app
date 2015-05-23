(function() {
  'use strict';

  angular
  .module('webApp')
  .factory('ResourceSession', ResourceSession);

  ResourceSession.$inject = ['$resource'];

  function ResourceSession($resource) {
    return $resource('/api/session/:id/:action', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      getFewUser: {
        method: 'GET',
        isArray: true,
        params: {
          action: 'user'
        }
      }
    });
  }
})();
