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
      remove: remove,
      addCompanyMember: addCompanyMember,
      removeCompanyMember: removeCompanyMember,
      getUserVehicles: getUserVehicles
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

    function update(body) {
      var object = new ResourceUser(body);
      return object.$update();
    }

    function remove(body) {
      var object = new ResourceUser(body);
      return object.$remove();
    }

    function addCompanyMember(body, companyId, role) {
      var object = new ResourceUser(body);
      object.company = companyId;
      object.role = role;
      return object.$addCompanyMember();
    }

    function removeCompanyMember(body) {
      var object = new ResourceUser(body);
      return object.$removeCompanyMember();
    }

    function getUserVehicles(id) {
      return ResourceUser.getUserVehicles({id: id}).$promise;
    }
  }
})();
