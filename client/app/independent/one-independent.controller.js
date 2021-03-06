(function() {
  'use strict';

  angular
    .module('webApp')
    .controller('OneIndependentCtrl', OneIndependentCtrl);

  OneIndependentCtrl.$inject = ['dataIndependent', 'glitch', '$state', '$stateParams', 'Auth'];

  function OneIndependentCtrl(dataIndependent, glitch, $state, $stateParams, Auth) {
    var vm = this;

    vm.independent = {};
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
      dataIndependent.getOne(id)
        .then(function(independent) {
          vm.independent = independent;
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
        angular.extend(vm.independent, {
          _creator: user._id
        });
        dataIndependent.create(vm.independent)
          .then(function(independent) {
            Auth.reloadUser(function() { // update user role in Auth
              $state.go('dashboard.location');
            });
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
        dataIndependent.update(vm.independent)
          .then(function(independent) {
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
        dataIndependent.remove(vm.independent)
          .then(function() {
            vm.independent = {};
            $state.go('independent');
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
