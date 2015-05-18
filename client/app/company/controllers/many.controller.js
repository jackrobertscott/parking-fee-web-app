(function() {
  'use strict';

  angular
  .module('webApp')
  .controller('ManyCompaniesCtrl', ManyCompaniesCtrl);

  ManyCompaniesCtrl.$inject = ['dataCompany', 'tracto', 'Auth'];

  function ManyCompaniesCtrl(dataCompany, tracto, Auth) {
    var vm = this;

    vm.items = [];
    vm.tracto = tracto;
    vm.getMany = getMany;
    vm.remove = remove;
    vm.authenticate = authenticate;
    vm.unauthenticate = unauthenticate;

    ////////////

    activate();

    ////////////

    function activate() {
      // code
    }

    function getMany() {
      vm.tracto.reset();
      dataCompany.getMany().then(function(items) {
        vm.items = items;
      }).catch(vm.tracto.handle);
    }

    function remove(item) {
      vm.tracto.reset();
      dataCompany.remove(item).then(function() {
        vm.items.forEach(function(elem, i, array) {
          if (array[i]._id === item._id) {
            array.splice(i, 1);
          }
        });
        vm.tracto.good = 'Successfully deleted item';
      }).catch(vm.tracto.handle);
    }

    function authenticate(item) {
      vm.tracto.reset();
      if (Auth.getRole() !== 'admin') {return;}
      item.authenticated = true;
      dataCompany.update(item).then(function () {
        vm.tracto.good = 'Successfully authenticated company';
      }).catch(vm.tracto.handle);
    }

    function unauthenticate(item) {
      vm.tracto.reset();
      if (Auth.getRole() !== 'admin') {return;}
      item.authenticated = false;
      dataCompany.update(item).then(function () {
        vm.tracto.good = 'Successfully unauthenticated company';
      }).catch(vm.tracto.handle);
    }
  }
})();
