(function() {
  'use strict';

  angular
  .module('webApp')
  .controller('ManyInfringementsCtrl', ManyInfringementsCtrl);

  ManyInfringementsCtrl.$inject = ['dataInfringement', 'glitch', 'socket', 'Auth', '$state'];

  function ManyInfringementsCtrl(dataInfringement, glitch, socket, Auth, $state) {
    var vm = this;

    vm.items = [];
    vm.glitch = glitch;
    vm.getMany = getMany;
    vm.remove = remove;
    vm.toSettings = toSettings;
    vm.getFewCompany = getFewCompany;

    ////////////

    activate();

    function activate() {
      // code...
    }

    ////////////

    function getMany() {
      vm.glitch.reset();
      dataInfringement.getMany()
      .then(function(items) {
        vm.items = items;
      })
      .catch(vm.glitch.handle);
    }

    function remove(item) {
      vm.glitch.reset();
      dataInfringement.remove(item)
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
      $state.go('infringementSettings', {
        id: item._id
      });
    }

    function getFewCompany() {
      vm.glitch.reset();
      dataInfringement.getFewCompany(Auth.getCurrentUser().company)
      .then(function(items) {
        vm.items = items;
      })
      .catch(vm.glitch.handle);
    }
  }
})();
