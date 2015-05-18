(function() {
  'use strict';

  angular
  .module('webApp')
  .controller('OneCompanyCtrl', OneCompanyCtrl);

  OneCompanyCtrl.$inject = ['dataCompany', 'tracto'];

  function OneCompanyCtrl(dataCompany, tracto) {
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
      return dataCompany.getOne(id).then(function(item) {
        vm.item = item;
      }).catch(tracto.handle);
    }

    function create(item) {
      item = item || vm.item;
      return dataCompany.create(item).then(function(item) {
        // code
      }).catch(tracto.handle);
    }

    function update(item) {
      item = item || vm.item;
      return dataCompany.update(item).then(function(item) {
        // code
      }).catch(tracto.handle);
    }

    function remove(item) {
      item = item || vm.item;
      return dataCompany.remove(item).then(function() {
        vm.item = {};
      }).catch(tracto.handle);
    }
  }
})();
