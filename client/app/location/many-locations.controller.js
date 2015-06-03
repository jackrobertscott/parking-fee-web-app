(function() {
  'use strict';

  angular
  .module('webApp')
  .controller('ManyLocationsCtrl', ManyLocationsCtrl);

  ManyLocationsCtrl.$inject = ['dataLocation', 'glitch', 'socket', '$state', 'Auth'];

  function ManyLocationsCtrl(dataLocation, glitch, socket, $state, Auth) {
    var vm = this;

    vm.items = [];
    vm.glitch = glitch;
    vm.getMany = getMany;
    vm.remove = remove;
    vm.getFew = getFew;
    vm.toSettings = toSettings;

    ////////////

    activate();

    ////////////

    function activate() {
      // code
    }

    function getMany() {
      vm.glitch.reset();
      dataLocation.getMany().then(function(items) {
        vm.items = items;
      }).catch(vm.glitch.handle);
    }

    function remove(item) {
      vm.glitch.reset();
      dataLocation.remove(item).then(function() {
        vm.items.forEach(function(elem, i, array) {
          if (array[i]._id === item._id) {
            array.splice(i, 1);
          }
        });
        vm.glitch.setSuccess('Successfully deleted item');
      }).catch(vm.glitch.handle);
    }

    function getFew() {
      dataLocation.getCompanyLocations(Auth.getCurrentUser().company)
      .then(function(items) {
        vm.items = items;
      }).catch(vm.glitch.handle);
    }

    function toSettings(item) {
      $state.go('locationSettings', {
        id: item._id
      });
    }
  }
})();
