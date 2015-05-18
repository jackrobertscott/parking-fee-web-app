(function() {
  'use strict';

  angular
  .module('webApp')
  .controller('ManyLocationsCtrl', ManyLocationsCtrl);

  ManyLocationsCtrl.$inject = ['dataLocation', 'tracto'];

  function ManyLocationsCtrl(dataLocation, tracto) {
    var vm = this;

    vm.items = [];
    vm.tracto = tracto;
    vm.getMany = getMany;
    vm.remove = remove;

    ////////////

    activate();

    ////////////

    function activate() {
      // code
    }

    function getMany() {
      vm.tracto.reset();
      dataLocation.getMany().then(function(items) {
        vm.items = items;
      }).catch(vm.tracto.handle);
    }

    function remove(item) {
      vm.tracto.reset();
      dataLocation.remove(item).then(function() {
        vm.items.forEach(function(elem, i, array) {
          if (array[i] === item) {
            array.splice(i, 1);
          }
        });
        vm.tracto.good = 'Successfully deleted item';
      }).catch(vm.tracto.handle);
    }
  }
})();
