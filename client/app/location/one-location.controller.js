(function() {
  'use strict';

  angular
    .module('webApp')
    .controller('OneLocationCtrl', OneLocationCtrl);

  OneLocationCtrl.$inject = ['dataLocation', 'glitch', '$state', 'Auth', '$stateParams', 'uiGmapGoogleMapApi'];

  function OneLocationCtrl(dataLocation, glitch, $state, Auth, $stateParams, uiGmapGoogleMapApi) {
    var vm = this;

    vm.location = {};
    vm.map = {};
    vm.marker = {};
    vm.glitch = glitch;
    vm.submitted = false;
    vm.getOne = getOne;
    vm.create = create;
    vm.update = update;
    vm.remove = remove;

    ////////////

    activate();

    function activate() {
      vm.map = {
        center: {
          latitude: 45,
          longitude: -73
        },
        zoom: 8,
        events: {
          click: function(map, event, args) {
            angular.extend(vm.location, {
              latitude: args[0].latLng.k,
              longitude: args[0].latLng.D
            });
          }
        }
      };
    }

    ////////////

    function getOne(id) {
      vm.glitch.reset();
      id = id || $stateParams.id;
      dataLocation.getOne(id)
        .then(function(location) {
          location.start = new Date(location.start);
          location.end = new Date(location.end);
          angular.extend(vm.map.center, {
            latitude: location.latitude,
            longitude: location.longitude
          });
          vm.location = location;
        })
        .catch(vm.glitch.handle);
    }

    function create(form) {
      vm.glitch.reset();
      vm.submitted = true;
      if (!form.$valid || !vm.location.latitude || !vm.location.longitude) {
        invalid();
      } else {
        var user = Auth.getCurrentUser();
        angular.extend(vm.location, {
          _creator: user._id,
          company: user.company,
          lat: vm.marker.coords.latitude,
          lng: vm.marker.coords.longitude
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

    function remove(form) {
      vm.glitch.reset();
      if (!form.$valid) {
        invalid();
      } else {
        dataLocation.remove(vm.location)
          .then(function() {
            vm.location = {};
            $state.go('locationCompany');
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
