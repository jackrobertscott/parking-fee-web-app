(function() {
  'use strict';

  angular
    .module('webApp')
    .controller('ManyLocationsCtrl', ManyLocationsCtrl);

  ManyLocationsCtrl.$inject = ['dataLocation', 'glitch', 'socket', '$state', 'Auth'];

  function ManyLocationsCtrl(dataLocation, glitch, socket, $state, Auth) {
    var vm = this;

    vm.locations = [];
    vm.map = {};
    vm.user = Auth.getCurrentUser();
    vm.glitch = glitch;
    vm.getMany = getMany;
    vm.remove = remove;
    vm.getFewCompany = getFewCompany;
    vm.toSettings = toSettings;
    vm.markerClick = markerClick;
    vm.optionChange = optionChange;

    ////////////

    activate();

    function activate() {
      vm.map.center = {
        latitude: 0,
        longitude: 0
      };
      vm.map.zoom = 1;
      // if (navigator.geolocation) {
      //   navigator.geolocation.getCurrentPosition(function(position) {
      //     vm.map.center.latitude = position.coords.latitude;
      //     vm.map.center.longitude = position.coords.longitude;
      //     vm.map.zoom = 8;
      //   });
      // }
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

    function remove(location) {
      vm.glitch.reset();
      dataLocation.remove(location)
        .then(function() {
          vm.locations.forEach(function(elem, i, array) {
            if (array[i]._id === location._id) {
              array.splice(i, 1);
            }
          });
          vm.glitch.setSuccess('Successfully deleted location');
        })
        .catch(vm.glitch.handle);
    }

    function getFewCompany() {
      dataLocation.getCompanyLocations(Auth.getCurrentUser().company._id)
        .then(function(locations) {
          vm.locations = locations;
        })
        .catch(vm.glitch.handle);
    }

    function getFewIndependent() {
      dataLocation.getIndependentLocations(Auth.getCurrentUser().independent._id)
        .then(function(locations) {
          vm.locations = locations;
        })
        .catch(vm.glitch.handle);
    }

    function toSettings(location) {
      $state.go('dashboard.location.settings', {
        id: location._id
      });
    }

    function markerClick(marker, event, object) {
      $state.go('dashboard.location.detail', {
        id: object._id
      });
    }

    function optionChange() {
      switch (vm.option) {
        case 'many':
          getMany();
          break;
        case 'comp':
          getFewCompany();
          break;
        case 'inde':
          getFewIndependent();
          break;
      }
    }
  }
})();
