(function() {
  'use strict';

  angular
  .module('resources')
  .factory('ResourceXxxUCPHxxx', ResourceXxxUCPHxxx);

  ResourceXxxUCPHxxx.$inject = ['$resource', 'ENV'];

  function ResourceXxxUCPHxxx($resource, ENV) {
    return $resource(ENV.apiEndpoint+'api/xxxLCPHxxxs/:id/:action', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
