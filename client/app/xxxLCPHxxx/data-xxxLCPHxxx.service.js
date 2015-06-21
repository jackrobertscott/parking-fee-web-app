(function() {
  'use strict';

  angular
    .module('dataServices')
    .factory('dataXxxUCPHxxx', dataXxxUCPHxxx);

  dataXxxUCPHxxx.$inject = ['ResourceXxxUCPHxxx'];

  function dataXxxUCPHxxx(ResourceXxxUCPHxxx) {
    var service = {
      getOne: getOne,
      getMany: getMany,
      create: create,
      update: update,
      remove: remove
    };

    return service;

    function getOne(id) {
      return ResourceXxxUCPHxxx.get({
        id: id
      }).$promise;
    }

    function getMany() {
      return ResourceXxxUCPHxxx.query().$promise;
    }

    function create(body) {
      var object = new ResourceXxxUCPHxxx(body);
      return object.$save();
    }

    function update(body) {
      var object = new ResourceXxxUCPHxxx(body);
      return object.$update();
    }

    function remove(body) {
      var object = new ResourceXxxUCPHxxx(body);
      return object.$remove();
    }
  }
})();