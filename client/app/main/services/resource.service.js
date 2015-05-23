(function() {
  'use strict';

  angular
  .module('webApp')
  .factory('ResourceMain', ResourceMain);

  ResourceMain.$inject = ['$resource'];

  function ResourceMain($resource) {
    return $resource('/api/END_POINT_HERE/:id', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
