(function() {
  'use strict';

  angular
    .module('webApp')
    .controller('InfringementCtrl', InfringementCtrl);

  InfringementCtrl.$inject = ['dataInfringement', 'glitch', 'socket', 'Auth', '$state', '$stateParams'];

  function InfringementCtrl(dataInfringement, glitch, socket, Auth, $state, $stateParams) {
    var vm = this;

    vm.infringement = {};
    vm.infringements = [];
    vm.submitted = false;
    vm.glitch = glitch;
    vm.getMany = getMany;
    vm.toSettings = toSettings;
    vm.getFewCompany = getFewCompany;
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
      dataInfringement.getMany()
        .then(function(infringements) {
          vm.infringements = infringements;
          vm.infringement = infringements[0];
        })
        .catch(vm.glitch.handle);
    }

    function getFewCompany() {
      vm.glitch.reset();
      dataInfringement.getFewCompany(Auth.getCurrentUser().company)
        .then(function(infringements) {
          vm.infringements = infringements;
          vm.infringement = infringements[0];
        })
        .catch(vm.glitch.handle);
    }

    function toSettings(infringement) {
      $state.go('app.infringement.settings', {
        id: infringement._id
      });
    }

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
            $state.go('infringement');
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
          })
          .catch(vm.glitch.handle);
      }
    }

    // function remove(infringement) {
    //   vm.glitch.reset();
    //   dataInfringement.remove(infringement)
    //     .then(function() {
    //       vm.infringements.forEach(function(elem, i, array) {
    //         if (array[i]._id === infringement._id) {
    //           array.splice(i, 1);
    //         }
    //       });
    //       vm.glitch.setSuccess('Successfully deleted infringement');
    //     })
    //     .catch(vm.glitch.handle);
    // }
    //
    // function remove(form) {
    //   vm.glitch.reset();
    //   if (!form.$valid) {
    //     invalid();
    //   } else {
    //     dataInfringement.remove(vm.infringement)
    //       .then(function() {
    //         vm.infringement = {};
    //         $state.go('infringement');
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
