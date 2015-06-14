(function() {
  'use strict';

  angular
    .module('webApp')
    .controller('OneVehicleCtrl', OneVehicleCtrl);

  OneVehicleCtrl.$inject = ['dataVehicle', 'glitch', '$state', 'Auth', '$stateParams'];

  function OneVehicleCtrl(dataVehicle, glitch, $state, Auth, $stateParams) {
    var vm = this;

    vm.vehicle = {};
    vm.glitch = glitch;
    vm.submitted = false;
    vm.getOne = getOne;
    vm.create = create;
    vm.update = update;
    vm.remove = remove;

    ////////////

    activate();

    function activate() {
      // replace these with real values
      vm.makes = ['Ford', 'Holden', 'Mazda', 'Suburu', 'Ferrari', 'Other'];
      vm.types = ['Sedan', 'Hatchback', 'Utility', 'Bus'];
      vm.colors = ['Red', 'Blue', 'Yellow', 'Green', 'Orange', 'Purple', 'White', 'Black'];
      vm.vehicle.make = vm.makes[0];
      vm.vehicle.type = vm.types[0];
      vm.vehicle.color = vm.colors[0];
    }

    ////////////

    function getOne(id) {
      vm.glitch.reset();
      id = id || $stateParams.id;
      dataVehicle.getOne(id)
        .then(function(vehicle) {
          vm.vehicle = vehicle;
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
        angular.extend(vm.vehicle, {
          _creator: user._id,
          users: [user._id]
        });
        dataVehicle.create(vm.vehicle)
          .then(function(vehicle) {
            $state.go('app.user.settings');
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
        dataVehicle.update(vm.vehicle)
          .then(function(vehicle) {
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
        dataVehicle.remove(vm.vehicle)
          .then(function() {
            vm.vehicle = {};
            $state.go('app.user.settings');
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
