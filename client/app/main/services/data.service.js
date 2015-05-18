(function() {
  'use strict';

  angular
  .module('webApp')
  .factory('dataMain', dataMain);

  dataMain.$inject = ['ResourceMain'];

  function dataMain(ResourceMain) {
    var service = {
      getOne: getOne,
      getMany: getMany,
      create: create,
      update: update,
      remove: remove
    };

    return service;

    function getOne(id) {
      return ResourceMain.get({id: id}).$promise;
    }

    function getMany(query) {
      query = query || {};
      return ResourceMain.query(query).$promise;
    }

    function create(body) {
      var object = new ResourceMain(body);
      return object.$save().$promise;
    }

    function update(object) {
      return object.$update.$promise;
    }

    function remove(object) {
      return object.$remove().$promise;
    }
  }
})();
