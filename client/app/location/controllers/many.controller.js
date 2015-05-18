(function() {
  'use strict';

  angular
  .module('webApp')
  .controller('ManyLocationsCtrl', ManyLocationsCtrl);

  ManyLocationsCtrl.$inject = ['dataLocation', 'tracto'];

  function ManyLocationsCtrl(dataLocation, tracto) {
    var vm = this;

    vm.items = [];
    vm.getMany = getMany;
    vm.remove = remove;

    ////////////

    activate();

    ////////////

    function activate() {
      return getMany();
    }

    function getMany() {
      return dataLocation.getMany().then(function(items) {
        vm.items = items;
      }).catch(tracto.handle);
    }

    function remove(item) {
      return dataLocation.remove(item).then(function() {
        vm.items.forEach(function(elem, i, array) {
          if (array[i] === item) {
            array.splice(i, 1);
          }
        });
      }).catch(tracto.handle);
    }
  }
})();
