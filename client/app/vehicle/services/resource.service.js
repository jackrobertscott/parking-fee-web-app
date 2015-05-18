(function() {
  'use strict';

  angular
  .module('webApp')
  .factory('ResourceAdmin', ResourceAdmin);

  ResourceAdmin.$inject = ['$resource'];

  function ResourceAdmin($resource) {
    return $resource();
  }
})();
