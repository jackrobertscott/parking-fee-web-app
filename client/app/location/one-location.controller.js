(function() {
  'use strict';

  angular
    .module('webApp')
    .controller('OneLocationCtrl', OneLocationCtrl);

  OneLocationCtrl.$inject = ['dataLocation', 'glitch', '$state', 'Auth', '$stateParams'];

  function OneLocationCtrl(dataLocation, glitch, $state, Auth, $stateParams) {
    var vm = this;

    vm.location = {};
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
      dataLocation.getOne(id)
        .then(function(location) {
          location.start = new Date(location.start);
          location.end = new Date(location.end);
          vm.location = location;
        })
        .catch(vm.glitch.handle);
    }

    function create(form) {
      vm.glitch.reset();
      vm.submitted = true;
      if (!form.$valid) {
        invalid();
      } else {
        var user = Auth.getCurrentUser();
        angular.extend(vm.location, {
          _creator: user._id,
          company: user.company
        });
        dataLocation.create(vm.location)
          .then(function(location) {
            $state.go('locationCompany');
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
        dataLocation.update(vm.location)
          .then(function(location) {
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
        dataLocation.remove(vm.location)
          .then(function() {
            vm.location = {};
            $state.go('locationCompany');
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
