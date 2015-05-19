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
      remove: remove,
      addMember: addMember,
      removeMember: removeMember
    };

    return service;

    function getOne(id) {
      return ResourceCompany.get({id: id}).$promise;
    }

    function getMany() {
      return ResourceCompany.query().$promise;
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

    function addMember(object, memberId) {
      if (object.members.indexOf(memberId) === -1) {
        object.members.push(memberId);
      }
      return object.$update();
    }

    function removeMember(object, memberId) {
      object.members.forEach(function(elem, i, array) {
        if (array[i] === memberId) {
          array[i].splice(i, 1);
        }
      });
      return object.$update();
    }
  }
})();
