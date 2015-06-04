(function() {
  'use strict';

  angular
  .module('webApp')
  .controller('OneXxxUCPHxxxCtrl', OneXxxUCPHxxxCtrl);

  OneXxxUCPHxxxCtrl.$inject = ['dataXxxUCPHxxx', 'glitch', '$state', '$stateParams'];

  function OneXxxUCPHxxxCtrl(dataXxxUCPHxxx, glitch, $state, $stateParams) {
    var vm = this;

    vm.xxxLCPHxxx = {};
    vm.glitch = glitch;
    vm.submitted = false;
    vm.getOne = getOne;
    vm.create = create;
    vm.update = update;
    vm.remove = remove;

    ////////////

    activate();

    function activate() {
      // code...
    }

    ////////////

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

    function remove(form) {
      vm.glitch.reset();
      if (!form.$valid) {
        invalid();
      } else {
        dataXxxUCPHxxx.remove(vm.xxxLCPHxxx)
        .then(function() {
          vm.xxxLCPHxxx = {};
          $state.go('xxxLCPHxxx');
        })
        .catch(vm.glitch.handle);
      }
    }

    function invalid() {
      vm.submitted = true;
      vm.glitch.setError('Form is invalid');
    }
  }
})();
