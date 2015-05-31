(function() {
  'use strict';

  angular
  .module('webApp')
  .controller('ManyMainsCtrl', ManyMainsCtrl);

  ManyMainsCtrl.$inject = ['dataMain', 'tracto', 'socket', '$state'];

  function ManyMainsCtrl(dataMain, tracto, socket, $state) {
    var vm = this;

    vm.items = [];
    vm.tracto = tracto;
    vm.getMany = getMany;
    vm.remove = remove;
    vm.toSettings = toSettings;

    ////////////

    activate();

    ////////////

    function activate() {
      // code
    }

    function getMany() {
      vm.tracto.reset();
      dataMain.getMany().then(function(items) {
        vm.items = items;
      }).catch(vm.tracto.handle);
    }

    function remove(item) {
      vm.tracto.reset();
      dataMain.remove(item).then(function() {
        vm.items.forEach(function(elem, i, array) {
          if (array[i]._id === item._id) {
            array.splice(i, 1);
          }
        });
        vm.tracto.good = 'Successfully deleted item';
      }).catch(vm.tracto.handle);
    }

    function toSettings(item) {
      $state.go('infringementSettings', {
        id: item._id
      });
    }
  }
})();
