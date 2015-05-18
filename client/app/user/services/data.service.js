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

    function getMany(query) {
      query = query || {};
      return ResourceUser.query(query).$promise;
    }

    function create(body) {
      var object = new ResourceUser(body);
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
