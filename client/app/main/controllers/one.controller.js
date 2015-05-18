(function() {
  'use strict';

  angular
  .module('webApp')
  .controller('OneMainCtrl', OneMainCtrl);

  OneMainCtrl.$inject = ['dataMain', 'tracto'];

  function OneMainCtrl(dataMain, tracto) {
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
      return dataMain.getOne(id).then(function(item) {
        vm.item = item;
      }).catch(vm.tracto.handle);
    }

    function create(item) {
      item = item || vm.item;
      return dataMain.create(item).then(function(item) {
        // code
      }).catch(vm.tracto.handle);
    }

    function update(item) {
      item = item || vm.item;
      return dataMain.update(item).then(function(item) {
        // code
      }).catch(vm.tracto.handle);
    }

    function remove(item) {
      item = item || vm.item;
      return dataMain.remove(item).then(function() {
        vm.item = {};
      }).catch(vm.tracto.handle);
    }
  }
})();
