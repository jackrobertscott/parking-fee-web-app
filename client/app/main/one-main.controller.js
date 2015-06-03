(function() {
  'use strict';

  angular
  .module('webApp')
  .controller('OneMainCtrl', OneMainCtrl);

  OneMainCtrl.$inject = ['dataMain', 'glitch', '$state', '$stateParams'];

  function OneMainCtrl(dataMain, glitch, $state, $stateParams) {
    var vm = this;

    vm.item = {};
    vm.glitch = glitch;
    vm.submitted = false;
    vm.getOne = getOne;
    vm.create = create;
    vm.update = update;
    vm.remove = remove;

    ////////////

    activate();

    ////////////

    function activate() {
      // code
    }

    function getOne(id) {
      vm.glitch.reset();
      id = id || $stateParams.id;
      dataMain.getOne(id).then(function(item) {
        vm.item = item;
      }).catch(vm.glitch.handle);
    }

    function create(form) {
      vm.glitch.reset();
      vm.submitted = true;
      if (!form.$valid) {
        invalid();
      } else {
        dataMain.create(vm.item).then(function(item) {
          $state.go('main');
        }).catch(vm.glitch.handle);
      }
    }

    function update(form) {
      vm.glitch.reset();
      vm.submitted = true;
      if (!form.$valid) {
        invalid();
      } else {
        return dataMain.update(vm.item).then(function(item) {
          vm.glitch.setSuccess('Successfully updated');
        }).catch(vm.glitch.handle);
      }
    }

    function remove(form) {
      vm.glitch.reset();
      if (!form.$valid) {
        invalid();
      } else {
        dataMain.remove(vm.item).then(function() {
          vm.item = {};
          $state.go('main');
        }).catch(vm.glitch.handle);
      }
    }

    function invalid() {
      vm.submitted = true;
      vm.glitch.setError('Form is invalid');
    }
  }
})();
