(function() {
  'use strict';

  angular
  .module('webApp')
  .controller('ManyCompaniesCtrl', ManyCompaniesCtrl);

  ManyCompaniesCtrl.$inject = ['dataCompany', 'tracto'];

  function ManyCompaniesCtrl(dataCompany, tracto) {
    var vm = this;

    vm.items = [];
    vm.tracto = tracto;
    vm.getMany = getMany;
    vm.remove = remove;

    ////////////

    activate();

    ////////////

    function activate() {
      return getMany();
    }

    function getMany() {
      return dataCompany.getMany().then(function(items) {
        vm.items = items;
      }).catch(vm.tracto.handle);
    }

    function remove(item) {
      return dataCompany.remove(item).then(function() {
        vm.items.forEach(function(elem, i, array) {
          if (array[i] === item) {
            array.splice(i, 1);
          }
        });
      }).catch(vm.tracto.handle);
    }
  }
})();
