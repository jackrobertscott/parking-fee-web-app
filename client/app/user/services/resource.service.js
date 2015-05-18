(function() {
  'use strict';

  angular
  .module('webApp')
  .factory('ResourceUser', ResourceUser);

  ResourceUser.$inject = ['$resource'];

  function ResourceUser($resource) {
    return $resource();
  }
})();
