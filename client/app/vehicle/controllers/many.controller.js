(function() {
  'use strict';

  angular
  .module('webApp')
  .controller('ManyVehiclesCtrl', ManyVehiclesCtrl);

  ManyVehiclesCtrl.$inject = ['dataVehicle', 'tracto'];

  function ManyVehiclesCtrl(dataVehicle, tracto) {
    var vm = this;

    vm.items = [];
    vm.tracto = tracto;
    vm.getMany = getMany;
    vm.remove = remove;

    ////////////

    activate();

    ////////////

    function activate() {
      return getMany();
    }

    function getMany() {
      return dataVehicle.getMany().then(function(items) {
        vm.items = items;
      }).catch(vm.tracto.handle);
    }

    function remove(item) {
      return dataVehicle.remove(item).then(function() {
        vm.items.forEach(function(elem, i, array) {
          if (array[i] === item) {
            array.splice(i, 1);
          }
        });
      }).catch(vm.tracto.handle);
    }
  }
})();
