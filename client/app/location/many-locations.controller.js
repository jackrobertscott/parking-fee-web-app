(function() {
  'use strict';

  angular
    .module('webApp')
    .controller('ManyLocationsCtrl', ManyLocationsCtrl);

  ManyLocationsCtrl.$inject = ['dataLocation', 'glitch', 'socket', '$state', 'Auth'];

  function ManyLocationsCtrl(dataLocation, glitch, socket, $state, Auth) {
    var vm = this;

    vm.locations = [];
    vm.glitch = glitch;
    vm.getMany = getMany;
    vm.remove = remove;
    vm.getFew = getFew;
    vm.toSettings = toSettings;

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
  }
})();
