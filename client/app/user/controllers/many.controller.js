(function() {
  'use strict';

  angular
  .module('webApp')
  .controller('ManyUsersCtrl', ManyUsersCtrl);

  ManyUsersCtrl.$inject = ['dataUser', 'tracto'];

  function ManyUsersCtrl(dataUser, tracto) {
    var vm = this;

    vm.items = [];
    vm.getMany = getMany;
    vm.remove = remove;

    ////////////

    activate();

    ////////////

    function activate() {
      return getMany();
    }

    function getMany() {
      return dataUser.getMany().then(function(items) {
        vm.items = items;
      }).catch(tracto.handle);
    }

    function remove(item) {
      return dataUser.remove(item).then(function() {
        vm.items.forEach(function(elem, i, array) {
          if (array[i] === item) {
            array.splice(i, 1);
          }
        });
      }).catch(tracto.handle);
    }
  }
})();
