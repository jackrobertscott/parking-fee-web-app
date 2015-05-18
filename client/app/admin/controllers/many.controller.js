(function() {
  'use strict';

  angular
  .module('webApp')
  .controller('ManyAdminsCtrl', ManyAdminsCtrl);

  ManyAdminsCtrl.$inject = ['dataAdmin', 'tracto'];

  function ManyAdminsCtrl(dataAdmin, tracto) {
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
      return dataAdmin.getMany().then(function(items) {
        vm.items = items;
      }).catch(vm.tracto.handle);
    }

    function remove(item) {
      return dataAdmin.remove(item).then(function() {
        vm.items.forEach(function(elem, i, array) {
          if (array[i] === item) {
            array.splice(i, 1);
          }
        });
      }).catch(vm.tracto.handle);
    }
  }
})();
