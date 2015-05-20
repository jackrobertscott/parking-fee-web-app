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

    function getMany() {
      return ResourceLocation.query().$promise;
    }

    function create(body) {
      var object = new ResourceLocation(body);
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
