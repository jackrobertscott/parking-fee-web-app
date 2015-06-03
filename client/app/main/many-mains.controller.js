(function() {
  'use strict';

  angular
  .module('webApp')
  .controller('ManyMainsCtrl', ManyMainsCtrl);

  ManyMainsCtrl.$inject = ['dataMain', 'glitch', 'socket', '$state'];

  function ManyMainsCtrl(dataMain, glitch, socket, $state) {
    var vm = this;

    vm.items = [];
    vm.glitch = glitch;
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
      vm.glitch.reset();
      dataMain.getMany().then(function(items) {
        vm.items = items;
      }).catch(vm.glitch.handle);
    }

    function remove(item) {
      vm.glitch.reset();
      dataMain.remove(item).then(function() {
        vm.items.forEach(function(elem, i, array) {
          if (array[i]._id === item._id) {
            array.splice(i, 1);
          }
        });
        vm.glitch.setSuccess('Successfully deleted item');
      }).catch(vm.glitch.handle);
    }

    function toSettings(item) {
      $state.go('infringementSettings', {
        id: item._id
      });
    }
  }
})();
