(function() {
  'use strict';

  angular
    .module('webApp')
    .controller('InspectionCtrl', InspectionCtrl);

  InspectionCtrl.$inject = ['dataInspection', 'glitch', 'socket', 'Auth', '$state', '$stateParams'];

  function InspectionCtrl(dataInspection, glitch, socket, Auth, $state, $stateParams) {
    var vm = this;

    vm.inspection = {};
    vm.inspections = [];
    vm.submitted = false;
    vm.glitch = glitch;
    vm.getMany = getMany;
    vm.toSettings = toSettings;
    vm.getFewCompany = getFewCompany;
    vm.getUserInfringed = getUserInfringed;
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
      dataInspection.getMany()
        .then(function(inspections) {
          vm.inspections = inspections;
        })
        .catch(vm.glitch.handle);
    }

    function toSettings(inspection) {
      $state.go('inspectionSettings', {
        id: inspection._id
      });
    }

    function getFewCompany() {
      vm.glitch.reset();
      dataInspection.getFewCompany(Auth.getCurrentUser().company)
        .then(function(inspections) {
          vm.inspections = inspections;
        })
        .catch(vm.glitch.handle);
    }

    function getUserInfringed() {
      vm.glitch.reset();
      dataInspection.getUserInfringed(Auth.getCurrentUser()._id)
        .then(function(inspections) {
          vm.inspections = inspections;
        })
        .catch(vm.glitch.handle);
    }

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
          company: user.company
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

    // function remove(form) {
    //   vm.glitch.reset();
    //   if (!form.$valid) {
    //     invalid();
    //   } else {
    //     dataInspection.remove(vm.inspection)
    //       .then(function() {
    //         vm.inspection = {};
    //         $state.go('inspection');
    //       })
    //       .catch(vm.glitch.handle);
    //   }
    // }
    //
    // function remove(inspection) {
    //   vm.glitch.reset();
    //   dataInspection.remove(inspection)
    //     .then(function() {
    //       vm.inspections.forEach(function(elem, i, array) {
    //         if (array[i]._id === inspection._id) {
    //           array.splice(i, 1);
    //         }
    //       });
    //       vm.glitch.setSuccess('Successfully deleted inspection');
    //     })
    //     .catch(vm.glitch.handle);
    // }

    function invalid() {
      vm.submitted = true;
      vm.glitch.setError('Form is invalid');
    }
  }
})();
