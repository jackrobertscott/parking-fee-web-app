(function() {
  'use strict';

  angular
    .module('webApp')
    .controller('OneInfringementCtrl', OneInfringementCtrl);

  OneInfringementCtrl.$inject = ['dataInfringement', 'glitch', '$state', '$stateParams', 'Auth'];

  function OneInfringementCtrl(dataInfringement, glitch, $state, $stateParams, Auth) {
    var vm = this;

    vm.infringement = {};
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
      dataInfringement.getOne(id)
        .then(function(infringement) {
          vm.infringement = infringement;
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
        angular.extend(vm.infringement, {
          _creator: user._id,
          company: user.company
        });
        dataInfringement.create(vm.infringement)
          .then(function(infringement) {
            $state.go('app.infringement.register', {}, {reload: true});
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
        dataInfringement.update(vm.infringement)
          .then(function(infringement) {
            vm.glitch.setSuccess('Successfully updated');
            vm.submitted = false;
          })
          .catch(vm.glitch.handle);
      }
    }

    function remove(form) {
      vm.glitch.reset();
      if (!form.$valid) {
        invalid();
      } else {
        dataInfringement.remove(vm.infringement)
          .then(function() {
            vm.infringement = {};
            $state.go('app.infringement.register', {}, {reload: true});
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
