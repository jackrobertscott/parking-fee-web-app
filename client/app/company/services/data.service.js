(function() {
  'use strict';

  angular
  .module('webApp')
  .factory('dataCompany', dataCompany);

  dataCompany.$inject = ['ResourceCompany'];

  function dataCompany(ResourceCompany) {
    var service = {
      getOne: getOne,
      getMany: getMany,
      create: create,
      update: update,
      remove: remove
    };

    return service;

    function getOne(id) {
      return ResourceCompany.get({id: id}).$promise;
    }

    function getMany(query) {
      query = query || {};
      return ResourceCompany.query(query).$promise;
    }

    function create(body) {
      var object = new ResourceCompany(body);
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
