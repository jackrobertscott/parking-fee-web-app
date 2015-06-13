(function() {
  'use strict';

  angular
    .module('webApp')
    .controller('LocationCtrl', LocationCtrl);

  LocationCtrl.$inject = ['dataLocation', 'glitch', 'socket', '$state', 'Auth', '$stateParams'];

  function LocationCtrl(dataLocation, glitch, socket, $state, Auth, $stateParams) {
    var vm = this;

    vm.location = {};
    vm.locations = [];
    vm.submitted = false;
    vm.glitch = glitch;
    vm.getMany = getMany;
    vm.getFew = getFew;
    vm.toSettings = toSettings;
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
      dataLocation.getMany()
        .then(function(locations) {
          vm.locations = locations;
        })
        .catch(vm.glitch.handle);
    }

    function getFew() {
      dataLocation.getCompanyLocations(Auth.getCurrentUser().company)
        .then(function(locations) {
          vm.locations = locations;
        })
        .catch(vm.glitch.handle);
    }

    function toSettings(location) {
      $state.go('app.location.settings', {
        id: location._id
      });
    }

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

    // function remove(location) {
    //   vm.glitch.reset();
    //   dataLocation.remove(location)
    //     .then(function() {
    //       vm.locations.forEach(function(elem, i, array) {
    //         if (array[i]._id === location._id) {
    //           array.splice(i, 1);
    //         }
    //       });
    //       vm.glitch.setSuccess('Successfully deleted location');
    //     })
    //     .catch(vm.glitch.handle);
    // }
    //
    // function remove(form) {
    //   vm.glitch.reset();
    //   if (!form.$valid) {
    //     invalid();
    //   } else {
    //     dataLocation.remove(vm.location)
    //       .then(function() {
    //         vm.location = {};
    //         $state.go('locationCompany');
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
