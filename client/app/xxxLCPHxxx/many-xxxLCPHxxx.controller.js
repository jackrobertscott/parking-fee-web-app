(function() {
  'use strict';

  angular
    .module('webApp')
    .controller('ManyXxxUCPHxxxsCtrl', ManyXxxUCPHxxxsCtrl);

  ManyXxxUCPHxxxsCtrl.$inject = ['dataXxxUCPHxxx', 'glitch', 'socket', '$state'];

  function ManyXxxUCPHxxxsCtrl(dataXxxUCPHxxx, glitch, socket, $state) {
    var vm = this;

    vm.xxxLCPHxxxs = [];
    vm.glitch = glitch;
    vm.getMany = getMany;
    vm.remove = remove;
    vm.toSettings = toSettings;

    ////////////

    activate();

    function activate() {
      // code...
    }

    ////////////

    function getMany() {
      vm.glitch.reset();
      dataXxxUCPHxxx.getMany()
        .then(function(xxxLCPHxxxs) {
          vm.xxxLCPHxxxs = xxxLCPHxxxs;
        })
        .catch(vm.glitch.handle);
    }

    function remove(xxxLCPHxxx) {
      vm.glitch.reset();
      dataXxxUCPHxxx.remove(xxxLCPHxxx)
        .then(function() {
          vm.xxxLCPHxxxs.forEach(function(elem, i, array) {
            if (array[i]._id === xxxLCPHxxx._id) {
              array.splice(i, 1);
            }
          });
          vm.glitch.setSuccess('Successfully deleted xxxLCPHxxx');
        })
        .catch(vm.glitch.handle);
    }

    function toSettings(xxxLCPHxxx) {
      $state.go('app.infringement.settings', {
        id: xxxLCPHxxx._id
      });
    }
  }
})();
