(function() {
  'use strict';

  angular
    .module('webApp')
    .controller('ManyInspectionsCtrl', ManyInspectionsCtrl);

  ManyInspectionsCtrl.$inject = ['dataInspection', 'glitch', 'socket', 'Auth', '$state'];

  function ManyInspectionsCtrl(dataInspection, glitch, socket, Auth, $state) {
    var vm = this;

    vm.inspections = [];
    vm.glitch = glitch;
    vm.getMany = getMany;
    vm.remove = remove;
    vm.toSettings = toSettings;
    vm.getFewCompany = getFewCompany;
    vm.getUserInfringed = getUserInfringed;

    ////////////

    activate();

    function activate() {
      // code...
    }

    ////////////

    function getMany() {
      vm.glitch.reset();
      dataInspection.getMany()
        .then(function(inspections) {
          vm.inspections = inspections;
        })
        .catch(vm.glitch.handle);
    }

    function remove(inspection) {
      vm.glitch.reset();
      dataInspection.remove(inspection)
        .then(function() {
          vm.inspections.forEach(function(elem, i, array) {
            if (array[i]._id === inspection._id) {
              array.splice(i, 1);
            }
          });
          vm.glitch.setSuccess('Successfully deleted inspection');
        })
        .catch(vm.glitch.handle);
    }

    function toSettings(inspection) {
      $state.go('inspectionSettings', {
        id: inspection._id
      });
    }

    function getFewCompany() {
      vm.glitch.reset();
      dataInspection.getFewCompany(Auth.getCurrentUser().company)
        .then(function(inspections) {
          vm.inspections = inspections;
        })
        .catch(vm.glitch.handle);
    }

    function getUserInfringed() {
      vm.glitch.reset();
      dataInspection.getUserInfringed(Auth.getCurrentUser()._id)
        .then(function(inspections) {
          vm.inspections = inspections;
        })
        .catch(vm.glitch.handle);
    }
  }
})();
