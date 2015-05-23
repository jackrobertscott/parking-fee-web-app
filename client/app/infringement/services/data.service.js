(function() {
  'use strict';

  angular
  .module('webApp')
  .factory('dataInfringement', dataInfringement);

  dataInfringement.$inject = ['ResourceInfringement'];

  function dataInfringement(ResourceInfringement) {
    var service = {
      getOne: getOne,
      getMany: getMany,
      create: create,
      update: update,
      remove: remove
    };

    return service;

    function getOne(id) {
      return ResourceInfringement.get({id: id}).$promise;
    }

    function getMany() {
      return ResourceInfringement.query().$promise;
    }

    function create(body) {
      var object = new ResourceInfringement(body);
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
