(function() {
  'use strict';

  angular
    .module('webApp')
    .controller('VehicleCtrl', VehicleCtrl);

  VehicleCtrl.$inject = ['dataVehicle', 'glitch', 'socket', '$state', 'Auth', '$stateParams'];

  function VehicleCtrl(dataVehicle, glitch, socket, $state, Auth, $stateParams) {
    var vm = this;

    vm.vehicle = {};
    vm.vehicles = [];
    vm.submitted = false;
    vm.glitch = glitch;
    vm.makes = [];
    vm.types = [];
    vm.colors = [];
    vm.getMany = getMany;
    vm.getFewUser = getFewUser;
    vm.toSettings = toSettings;
    vm.getOne = getOne;
    vm.create = create;
    vm.update = update;
    // vm.remove = remove;

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

    function getMany() {
      vm.glitch.reset();
      dataVehicle.getMany()
        .then(function(vehicles) {
          vm.vehicles = vehicles;
        })
        .catch(vm.glitch.handle);
    }

    function getFewUser() {
      dataVehicle.getUserVehicles(Auth.getCurrentUser()._id)
        .then(function(vehicles) {
          vm.vehicles = vehicles;
        })
        .catch(vm.glitch.handle);
    }

    function toSettings(vehicle) {
      $state.go('app.vehicle.settings', {
        id: vehicle._id
      });
    }function getOne(id) {
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
            $state.go('vehicleUser');
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
          })
          .catch(vm.glitch.handle);
      }
    }

    // function remove(vehicle) {
    //   vm.glitch.reset();
    //   dataVehicle.remove(vehicle)
    //     .then(function() {
    //       vm.vehicles.forEach(function(elem, i, array) {
    //         if (array[i]._id === vehicle._id) {
    //           array.splice(i, 1);
    //         }
    //       });
    //       vm.glitch.setSuccess('Successfully deleted vehicle');
    //     })
    //     .catch(vm.glitch.handle);
    // }
    //
    // function remove(form) {
    //   vm.glitch.reset();
    //   if (!form.$valid) {
    //     invalid();
    //   } else {
    //     dataVehicle.remove(vm.vehicle)
    //       .then(function() {
    //         vm.vehicle = {};
    //         $state.go('vehicleUser');
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
