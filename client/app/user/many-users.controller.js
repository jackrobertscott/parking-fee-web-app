(function() {
  'use strict';

  angular
  .module('webApp')
  .controller('ManyUsersCtrl', ManyUsersCtrl);

  ManyUsersCtrl.$inject = ['dataUser', 'glitch'];

  function ManyUsersCtrl(dataUser, glitch) {
    var vm = this;

    vm.items = [];
    vm.glitch = glitch;
    vm.getMany = getMany;
    vm.remove = remove;

    ////////////

    activate();

    ////////////

    function activate() {
      // code
    }

    function getMany() {
      vm.glitch.reset();
      dataUser.getMany().then(function(items) {
        vm.items = items;
      }).catch(vm.glitch.handle);
    }

    function remove(item) {
      vm.glitch.reset();
      dataUser.remove(item).then(function() {
        vm.items.forEach(function(elem, i, array) {
          if (array[i]._id === item._id) {
            array.splice(i, 1);
          }
        });
        vm.glitch.setSuccess('Successfully deleted item');
      }).catch(vm.glitch.handle);
    }
  }
})();
