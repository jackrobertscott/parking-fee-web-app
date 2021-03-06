(function() {
  'use strict';

  angular
    .module('webApp')
    .controller('OneInspectionCtrl', OneInspectionCtrl);

  OneInspectionCtrl.$inject = ['dataInspection', 'glitch', '$state', '$stateParams', 'Auth'];

  function OneInspectionCtrl(dataInspection, glitch, $state, $stateParams, Auth) {
    var vm = this;

    vm.inspection = {};
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
      dataInspection.getOne(id)
        .then(function(inspection) {
          vm.inspection = inspection;
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
        angular.extend(vm.inspection, {
          _creator: user._id,
          company: user.company._id
        });
        dataInspection.create(vm.inspection)
          .then(function(inspection) {
            $state.go('inspection');
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
        dataInspection.update(vm.inspection)
          .then(function(inspection) {
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
        dataInspection.remove(vm.inspection)
          .then(function() {
            vm.inspection = {};
            $state.go('inspection');
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
