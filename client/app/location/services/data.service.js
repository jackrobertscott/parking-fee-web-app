(function() {
  'use strict';

  angular
  .module('webApp')
  .factory('dataLocation', dataLocation);

  dataLocation.$inject = ['ResourceLocation'];

  function dataLocation(ResourceLocation) {
    var service = {
      getOne: getOne,
      getMany: getMany,
      create: create,
      update: update,
      remove: remove
    };

    return service;

    function getOne(id) {
      return ResourceLocation.get({id: id}).$promise;
    }

    function getMany(query) {
      query = query || {};
      return ResourceLocation.query(query).$promise;
    }

    function create(body) {
      var object = new ResourceLocation(body);
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
