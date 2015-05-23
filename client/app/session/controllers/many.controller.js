(function() {
  'use strict';

  angular
  .module('webApp')
  .controller('ManySessionsCtrl', ManySessionsCtrl);

  ManySessionsCtrl.$inject = ['dataSession', 'tracto', 'socket', 'Auth'];

  function ManySessionsCtrl(dataSession, tracto, socket, Auth) {
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
      dataSession.getMany().then(function(items) {
        vm.items = items;
      }).catch(vm.tracto.handle);
    }

    function remove(item) {
      vm.tracto.reset();
      dataSession.remove(item).then(function() {
        vm.items.forEach(function(elem, i, array) {
          if (array[i]._id === item._id) {
            array.splice(i, 1);
          }
        });
        vm.tracto.good = 'Successfully deleted item';
      }).catch(vm.tracto.handle);
    }

    function getFewUser() {
      vm.tracto.reset();
      dataSession.getFewUser(Auth.getCurrentUser()._id)
      .then(function(items) {
        vm.items = items;
      }).catch(vm.tracto.handle);
    }
  }
})();
