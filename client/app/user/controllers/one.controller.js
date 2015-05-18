(function() {
  'use strict';

  angular
  .module('webApp')
  .controller('OneUserCtrl', OneUserCtrl);

  OneUserCtrl.$inject = ['dataUser', 'tracto'];

  function OneUserCtrl(dataUser, tracto) {
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
      return dataUser.getOne(id).then(function(item) {
        vm.item = item;
      }).catch(tracto.handle);
    }

    function create(item) {
      item = item || vm.item;
      return dataUser.create(item).then(function(item) {
        // code
      }).catch(tracto.handle);
    }

    function update(item) {
      item = item || vm.item;
      return dataUser.update(item).then(function(item) {
        // code
      }).catch(tracto.handle);
    }

    function remove(item) {
      item = item || vm.item;
      return dataUser.remove(item).then(function() {
        vm.item = {};
      }).catch(tracto.handle);
    }
  }
})();
