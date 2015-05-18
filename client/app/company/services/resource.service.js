(function() {
  'use strict';

  angular
  .module('webApp')
  .factory('ResourceCompany', ResourceCompany);

  ResourceCompany.$inject = ['$resource'];

  function ResourceCompany($resource) {
    return $resource();
  }
})();
