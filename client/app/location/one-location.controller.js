(function() {
  'use strict';

  angular
  .module('webApp')
  .controller('OneLocationCtrl', OneLocationCtrl);

  OneLocationCtrl.$inject = ['dataLocation', 'glitch', '$state', 'Auth', '$stateParams'];

  function OneLocationCtrl(dataLocation, glitch, $state, Auth, $stateParams) {
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
      dataLocation.getOne(id).then(function(item) {
        item.start = new Date(item.start);
        item.end = new Date(item.end);
        vm.item = item;
      }).catch(vm.glitch.handle);
    }

    function create(form) {
      vm.glitch.reset();
      vm.submitted = true;
      if (!form.$valid) {
        invalid();
      } else {
        var user = Auth.getCurrentUser();
        angular.extend(vm.item, {
          _creator: user._id,
          company: user.company
        });
        dataLocation.create(vm.item).then(function(item) {
          $state.go('locationCompany');
        }).catch(vm.glitch.handle);
      }
    }

    function update(form) {
      vm.glitch.reset();
      vm.submitted = true;
      if (!form.$valid) {
        invalid();
      } else {
        return dataLocation.update(vm.item).then(function(item) {
          vm.glitch.setSuccess('Successfully updated');
        }).catch(vm.glitch.handle);
      }
    }

    function remove(form) {
      vm.glitch.reset();
      if (!form.$valid) {
        invalid();
      } else {
        dataLocation.remove(vm.item).then(function() {
          vm.item = {};
          $state.go('locationCompany');
        }).catch(vm.glitch.handle);
      }
    }

    function invalid() {
      vm.submitted = true;
      vm.glitch.setError('Form is invalid');
    }
  }
})();
