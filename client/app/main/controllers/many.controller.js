(function() {
  'use strict';

  angular
  .module('webApp')
  .controller('ManyMainsCtrl', ManyMainsCtrl);

  ManyMainsCtrl.$inject = ['dataMain', 'tracto'];

  function ManyMainsCtrl(dataMain, tracto) {
    var vm = this;

    vm.items = [];
    vm.tracto = tracto;
    vm.getMany = getMany;
    vm.remove = remove;

    ////////////

    activate();

    ////////////

    function activate() {
      return vm.getMany();
    }

    function getMany() {
      return dataMain.getMany().then(function(items) {
        vm.items = items;
      }).catch(vm.tracto.handle);
    }

    function remove(item) {
      return dataMain.remove(item).then(function() {
        vm.items.forEach(function(elem, i, array) {
          if (array[i] === item) {
            array.splice(i, 1);
          }
        });
      }).catch(vm.tracto.handle);
    }
  }
})();
