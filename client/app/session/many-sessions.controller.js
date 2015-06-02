(function() {
  'use strict';

  angular
  .module('webApp')
  .controller('ManySessionsCtrl', ManySessionsCtrl);

  ManySessionsCtrl.$inject = ['dataSession', 'glitch', 'socket', 'Auth'];

  function ManySessionsCtrl(dataSession, glitch, socket, Auth) {
    var vm = this;

    vm.items = [];
    vm.glitch = glitch;
    vm.getMany = getMany;
    vm.remove = remove;
    vm.getFewUser = getFewUser;

    ////////////

    activate();

    ////////////

    function activate() {
      // code
    }

    function getMany() {
      vm.glitch.reset();
      dataSession.getMany().then(function(items) {
        vm.items = items;
      }).catch(vm.glitch.handle);
    }

    function remove(item) {
      vm.glitch.reset();
      dataSession.remove(item).then(function() {
        vm.items.forEach(function(elem, i, array) {
          if (array[i]._id === item._id) {
            array.splice(i, 1);
          }
        });
        vm.glitch.good = 'Successfully deleted item';
      }).catch(vm.glitch.handle);
    }

    function getFewUser() {
      vm.glitch.reset();
      dataSession.getFewUser(Auth.getCurrentUser()._id)
      .then(function(items) {
        vm.items = items;
      }).catch(vm.glitch.handle);
    }
  }
})();
