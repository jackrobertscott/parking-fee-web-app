(function() {
  'use strict';

  angular
  .module('webApp')
  .factory('dataVehicle', dataVehicle);

  dataVehicle.$inject = ['ResourceVehicle'];

  function dataVehicle(ResourceVehicle) {
    var service = {
      getOne: getOne,
      getMany: getMany,
      create: create,
      update: update,
      remove: remove
    };

    return service;

    function getOne(id) {
      return ResourceVehicle.get({id: id}).$promise;
    }

    function getMany() {
      return ResourceVehicle.query().$promise;
    }

    function create(body) {
      var object = new ResourceVehicle(body);
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
