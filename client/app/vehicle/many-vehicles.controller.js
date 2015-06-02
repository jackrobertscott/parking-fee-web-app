(function() {
  'use strict';

  angular
  .module('webApp')
  .controller('ManyVehiclesCtrl', ManyVehiclesCtrl);

  ManyVehiclesCtrl.$inject = ['dataVehicle', 'glitch', 'socket', '$state', 'Auth'];

  function ManyVehiclesCtrl(dataVehicle, glitch, socket, $state, Auth) {
    var vm = this;

    vm.items = [];
    vm.glitch = glitch;
    vm.getMany = getMany;
    vm.remove = remove;
    vm.getForUser = getForUser;
    vm.toSettings = toSettings;

    ////////////

    activate();

    ////////////

    function activate() {
      // code
    }

    function getMany() {
      vm.glitch.reset();
      dataVehicle.getMany()
      .then(function(items) {
        vm.items = items;
      })
      .catch(vm.glitch.handle);
    }

    function remove(item) {
      vm.glitch.reset();
      dataVehicle.remove(item)
      .then(function() {
        vm.items.forEach(function(elem, i, array) {
          if (array[i]._id === item._id) {
            array.splice(i, 1);
          }
        });
        vm.glitch.good = 'Successfully deleted item';
      })
      .catch(vm.glitch.handle);
    }

    function getForUser() {
      dataVehicle.getUserVehicles(Auth.getCurrentUser()._id)
      .then(function(items) {
        vm.items = items;
      })
      .catch(vm.glitch.handle);
    }

    function toSettings(item) {
      $state.go('vehicleSettings', {
        id: item._id
      });
    }
  }
})();
