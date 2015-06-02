(function() {
  'use strict';

  angular
  .module('webApp')
  .controller('OneVehicleCtrl', OneVehicleCtrl);

  OneVehicleCtrl.$inject = ['dataVehicle', 'glitch', '$state', 'Auth', '$stateParams'];

  function OneVehicleCtrl(dataVehicle, glitch, $state, Auth, $stateParams) {
    var vm = this;

    vm.item = {};
    vm.glitch = glitch;
    vm.submitted = false;
    vm.getOne = getOne;
    vm.create = create;
    vm.update = update;
    vm.remove = remove;

    vm.makes = ['Ford', 'Holden', 'Mazda', 'Suburu', 'Ferrari', 'Other'];
    vm.types = ['Sedan', 'Hatchback', 'Utility', 'Bus'];
    vm.colors = ['Red', 'Blue', 'Yellow', 'Green', 'Orange', 'Purple', 'White', 'Black'];
    vm.item.make = vm.makes[0];
    vm.item.type = vm.types[0];
    vm.item.color = vm.colors[0];

    ////////////

    activate();

    ////////////

    function activate() {
      // code
    }

    function getOne(id) {
      vm.glitch.reset();
      id = id || $stateParams.id;
      dataVehicle.getOne(id).then(function(item) {
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
          users: [user._id]
        });
        dataVehicle.create(vm.item).then(function(item) {
          $state.go('vehicleUser');
        }).catch(vm.glitch.handle);
      }
    }

    function update(form) {
      vm.glitch.reset();
      vm.submitted = true;
      if (!form.$valid) {
        invalid();
      } else {
        dataVehicle.update(vm.item).then(function(item) {
          vm.glitch.good = 'Successfully updated';
        }).catch(vm.glitch.handle);
      }
    }

    function remove(form) {
      vm.glitch.reset();
      if (!form.$valid) {
        invalid();
      } else {
        dataVehicle.remove(vm.item).then(function() {
          vm.item = {};
          $state.go('vehicleUser');
        }).catch(vm.glitch.handle);
      }
    }

    function invalid() {
      vm.submitted = true;
      vm.glitch.bad = 'Form is invalid';
    }
  }
})();
