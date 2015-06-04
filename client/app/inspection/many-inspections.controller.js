(function() {
  'use strict';

  angular
  .module('webApp')
  .controller('ManyInspectionsCtrl', ManyInspectionsCtrl);

  ManyInspectionsCtrl.$inject = ['dataInspection', 'glitch', 'socket', 'Auth', '$state'];

  function ManyInspectionsCtrl(dataInspection, glitch, socket, Auth, $state) {
    var vm = this;

    vm.items = [];
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
      .then(function(items) {
        vm.items = items;
      })
      .catch(vm.glitch.handle);
    }

    function remove(item) {
      vm.glitch.reset();
      dataInspection.remove(item)
      .then(function() {
        vm.items.forEach(function(elem, i, array) {
          if (array[i]._id === item._id) {
            array.splice(i, 1);
          }
        });
        vm.glitch.setSuccess('Successfully deleted item');
      })
      .catch(vm.glitch.handle);
    }

    function toSettings(item) {
      $state.go('inspectionSettings', {
        id: item._id
      });
    }

    function getFewCompany() {
      vm.glitch.reset();
      dataInspection.getFewCompany(Auth.getCurrentUser().company)
      .then(function(items) {
        vm.items = items;
      })
      .catch(vm.glitch.handle);
    }

    function getUserInfringed() {
      vm.glitch.reset();
      dataInspection.getUserInfringed(Auth.getCurrentUser()._id)
      .then(function(items) {
        vm.items = items;
      })
      .catch(vm.glitch.handle);
    }
  }
})();
