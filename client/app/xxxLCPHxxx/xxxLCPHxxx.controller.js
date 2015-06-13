(function() {
  'use strict';

  angular
    .module('webApp')
    .controller('XxxUCPHxxxCtrl', XxxUCPHxxxCtrl);

  XxxUCPHxxxCtrl.$inject = ['dataXxxUCPHxxx', 'glitch', 'socket', '$state', '$stateParams'];

  function XxxUCPHxxxCtrl(dataXxxUCPHxxx, glitch, socket, $state, $stateParams) {
    var vm = this;

    vm.xxxLCPHxxx = {};
    vm.xxxLCPHxxxs = [];
    vm.submitted = false;
    vm.glitch = glitch;
    vm.getMany = getMany;
    vm.toSettings = toSettings;
    vm.getOne = getOne;
    vm.create = create;
    vm.update = update;
    // vm.remove = remove;

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

    function toSettings(xxxLCPHxxx) {
      $state.go('app.infringement.settings', {
        id: xxxLCPHxxx._id
      });
    }

    function getOne(id) {
      vm.glitch.reset();
      id = id || $stateParams.id;
      dataXxxUCPHxxx.getOne(id)
        .then(function(xxxLCPHxxx) {
          vm.xxxLCPHxxx = xxxLCPHxxx;
        })
        .catch(vm.glitch.handle);
    }

    function create(form) {
      vm.glitch.reset();
      vm.submitted = true;
      if (!form.$valid) {
        invalid();
      } else {
        dataXxxUCPHxxx.create(vm.xxxLCPHxxx)
          .then(function(xxxLCPHxxx) {
            $state.go('xxxLCPHxxx');
          })
          .catch(vm.glitch.handle);
      }
    }

    function update(form) {
      vm.glitch.reset();
      vm.submitted = true;
      if (!form.$valid) {
        invalid();
      } else {
        dataXxxUCPHxxx.update(vm.xxxLCPHxxx)
          .then(function(xxxLCPHxxx) {
            vm.glitch.setSuccess('Successfully updated');
          })
          .catch(vm.glitch.handle);
      }
    }

    // function remove(xxxLCPHxxx) {
    //   vm.glitch.reset();
    //   dataXxxUCPHxxx.remove(xxxLCPHxxx)
    //     .then(function() {
    //       vm.xxxLCPHxxxs.forEach(function(elem, i, array) {
    //         if (array[i]._id === xxxLCPHxxx._id) {
    //           array.splice(i, 1);
    //         }
    //       });
    //       vm.glitch.setSuccess('Successfully deleted xxxLCPHxxx');
    //     })
    //     .catch(vm.glitch.handle);
    // }
    //
    // function remove(form) {
    //   vm.glitch.reset();
    //   if (!form.$valid) {
    //     invalid();
    //   } else {
    //     dataXxxUCPHxxx.remove(vm.xxxLCPHxxx)
    //       .then(function() {
    //         vm.xxxLCPHxxx = {};
    //         $state.go('xxxLCPHxxx');
    //       })
    //       .catch(vm.glitch.handle);
    //   }
    // }

    function invalid() {
      vm.submitted = true;
      vm.glitch.setError('Form is invalid');
    }
  }
})();
