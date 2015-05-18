(function() {
  'use strict';

  angular
  .module('webApp')
  .factory('dataUser', dataUser);

  dataUser.$inject = ['ResourceUser'];

  function dataUser(ResourceUser) {
    var service = {
      getOne: getOne,
      getMany: getMany,
      create: create,
      update: update,
      remove: remove
    };

    return service;

    function getOne(id) {
      return ResourceUser.get({id: id}).$promise;
    }

    function getMany() {
      return ResourceUser.query().$promise;
    }

    function create(body) {
      var object = new ResourceUser(body);
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
