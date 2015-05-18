(function() {
  'use strict';

  angular
  .module('webApp')
  .factory('ResourceMain', ResourceMain);

  ResourceMain.$inject = ['$resource'];

  function ResourceMain($resource) {
    return $resource();
  }
})();
