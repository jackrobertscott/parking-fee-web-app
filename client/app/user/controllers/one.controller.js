(function() {
  'use strict';

  angular
  .module('webApp')
  .controller('OneAdminCtrl', OneAdminCtrl);

  OneAdminCtrl.$inject = ['dataAdmin', 'tracto'];

  function OneAdminCtrl(dataAdmin, tracto) {
    var vm = this;

    vm.item = {};
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
      return dataAdmin.getOne(id).then(function(item) {
        vm.item = item;
      }).catch(tracto.handle);
    }

    function create(item) {
      item = item || vm.item;
      return dataAdmin.create(item).then(function(item) {
        // code
      }).catch(tracto.handle);
    }

    function update(item) {
      item = item || vm.item;
      return dataAdmin.update(item).then(function(item) {
        // code
      }).catch(tracto.handle);
    }

    function remove(item) {
      item = item || vm.item;
      return dataAdmin.remove(item).then(function() {
        vm.item = {};
      }).catch(tracto.handle);
    }
  }
})();
