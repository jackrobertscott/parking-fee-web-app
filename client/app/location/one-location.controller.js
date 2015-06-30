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
    vm.times = [];
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
          latitude: -31.9546529,
          longitude: 115.852662
        },
        zoom: 10,
        events: {
          click: function(map, event, args) {
            angular.extend(vm.location, {
              latitude: args[0].latLng.k,
              longitude: args[0].latLng.D
            });
          }
        }
      };
      for (var i = 0; i <= 24; i++) { // need to make sure not longer than limits
        vm.times.push({
          label: i ? String(i * 30 + ' mins'): 'Unlimited',
          value: i * 30 * 60 * 1000 // Milliseconds (like from Date object)
        });
      }
      vm.location.limit = vm.times[0].value;
    }

    ////////////

    function getOne(id) {
      vm.glitch.reset();
      id = id || $stateParams.id;
      dataLocation.getOne(id)
        .then(function(location) {
          var user = Auth.getCurrentUser();
          if ((user.company && user.company.locations.indexOf(location._id) !== -1) ||
            (user.independent && user.independent.locations.indexOf(location._id) !== -1)) {
            location.edit = true;
          } else {
            location.edit = false;
            // Not allowed to edit
            // Need to make a better check system for all pages
            if ($state.is('dashboard.location.settings')) {
              $state.go('dashboard.location');
            }
          }
          location.start = new Date(location.start);
          location.end = new Date(location.end);
          vm.location = location;
          angular.extend(vm.map.center, {
            latitude: location.latitude,
            longitude: location.longitude
          });
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
          _creator: user._id
        });
        dataLocation.create(vm.location)
          .then(function(location) {
            $state.go('dashboard.location.register', {}, {
              reload: true
            });
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
            $state.go('dashboard.location.detail', {
              id: location._id
            });
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
            $state.go('dashboard.location.register', {}, {
              reload: true
            });
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
