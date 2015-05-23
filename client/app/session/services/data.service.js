(function() {
  'use strict';

  angular
  .module('webApp')
  .factory('dataSession', dataSession);

  dataSession.$inject = ['ResourceSession'];

  function dataSession(ResourceSession) {
    var service = {
      getOne: getOne,
      getMany: getMany,
      create: create,
      update: update,
      remove: remove
    };

    return service;

    function getOne(id) {
      return ResourceSession.get({id: id}).$promise;
    }

    function getMany() {
      return ResourceSession.query().$promise;
    }

    function create(body) {
      var object = new ResourceSession(body);
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
