(function() {
  'use strict';

  angular
  .module('webApp')
  .controller('OneVehicleCtrl', OneVehicleCtrl);

  OneVehicleCtrl.$inject = ['dataVehicle', 'tracto', '$state', 'Auth', '$stateParams'];

  function OneVehicleCtrl(dataVehicle, tracto, $state, Auth, $stateParams) {
    var vm = this;

    vm.item = {};
    vm.tracto = tracto;
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
      vm.tracto.reset();
      id = id || $stateParams.id;
      dataVehicle.getOne(id).then(function(item) {
        vm.item = item;
      }).catch(vm.tracto.handle);
    }

    function create(form) {
      vm.tracto.reset();
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
        }).catch(vm.tracto.handle);
      }
    }

    function update(form) {
      vm.tracto.reset();
      if (!form.$valid) {
        invalid();
      } else {
        return dataVehicle.update(vm.item).then(function(item) {
          vm.tracto.good = 'Successfully updated';
        }).catch(vm.tracto.handle);
      }
    }

    function remove(form) {
      vm.tracto.reset();
      if (!form.$valid) {
        invalid();
      } else {
        dataVehicle.remove(vm.item).then(function() {
          vm.item = {};
          $state.go('vehicleUser');
        }).catch(vm.tracto.handle);
      }
    }

    function invalid() {
      vm.submitted = true;
      vm.tracto.bad = 'Form is invalid';
    }
  }
})();
