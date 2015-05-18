(function() {
  'use strict';

  angular
  .module('webApp')
  .controller('ManyVehiclesCtrl', ManyVehiclesCtrl);

  ManyVehiclesCtrl.$inject = ['dataVehicle', 'tracto', '$state', 'Auth'];

  function ManyVehiclesCtrl(dataVehicle, tracto, $state, Auth) {
    var vm = this;

    vm.items = [];
    vm.tracto = tracto;
    vm.getMany = getMany;
    vm.remove = remove;
    vm.getFew = getFew;
    vm.toSettings = toSettings;

    ////////////

    activate();

    ////////////

    function activate() {
      // code
    }

    function getMany() {
      vm.tracto.reset();
      dataVehicle.getMany().then(function(items) {
        vm.items = items;
      }).catch(vm.tracto.handle);
    }

    function remove(item) {
      vm.tracto.reset();
      dataVehicle.remove(item).then(function() {
        vm.items.forEach(function(elem, i, array) {
          if (array[i]._id === item._id) {
            array.splice(i, 1);
          }
        });
        vm.tracto.good = 'Successfully deleted item';
      }).catch(vm.tracto.handle);
    }

    function getFew() {
      Auth.getCurrentUser().vehicles.forEach(function(vehicle) {
        dataVehicle.getOne(vehicle)
        .then(function(item) {
          vm.items.push(item);
        }).catch(vm.tracto.handle);
      });
    }

    function toSettings(item) {
      $state.go('vehicleSettings', {
        id: item._id
      });
    }
  }
})();
