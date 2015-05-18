(function() {
  'use strict';

  angular
  .module('webApp')
  .factory('dataAdmin', dataAdmin);

  dataAdmin.$inject = ['ResourceAdmin'];

  function dataAdmin(ResourceAdmin) {
    var service = {
      getOne: getOne,
      getMany: getMany,
      create: create,
      update: update,
      remove: remove
    };

    return service;

    function getOne(id) {
      return ResourceAdmin.get({id: id}).$promise;
    }

    function getMany(query) {
      query = query || {};
      return ResourceAdmin.query(query).$promise;
    }

    function create(body) {
      var object = new ResourceAdmin(body);
      return object.$save();
    }

    function update(object) {
      return object.$update();
    }

    function remove(object) {
      return object.$remove();
    }
  }
})();
