(function() {
  'use strict';

  angular
  .module('webApp')
  .controller('OneLocationCtrl', OneLocationCtrl);

  OneLocationCtrl.$inject = ['dataLocation', 'tracto'];

  function OneLocationCtrl(dataLocation, tracto) {
    var vm = this;

    vm.item = {};
    vm.tracto = tracto;
    vm.findOne = findOne;
    vm.create = create;
    vm.update = update;
    vm.remove = remove;

    ////////////

    activate();

    ////////////

    function activate() {
      // code
    }

    function findOne(id) {
      return dataLocation.getOne(id).then(function(item) {
        vm.item = item;
      }).catch(vm.tracto.handle);
    }

    function create(item) {
      item = item || vm.item;
      return dataLocation.create(item).then(function(item) {
        // code
      }).catch(vm.tracto.handle);
    }

    function update(item) {
      item = item || vm.item;
      return dataLocation.update(item).then(function(item) {
        // code
      }).catch(vm.tracto.handle);
    }

    function remove(item) {
      item = item || vm.item;
      return dataLocation.remove(item).then(function() {
        vm.item = {};
      }).catch(vm.tracto.handle);
    }
  }
})();
