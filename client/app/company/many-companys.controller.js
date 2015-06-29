(function() {
  'use strict';

  angular
    .module('webApp')
    .controller('ManyCompanysCtrl', ManyCompanysCtrl);

  ManyCompanysCtrl.$inject = ['dataCompany', 'glitch', 'socket', '$state', 'Auth'];

  function ManyCompanysCtrl(dataCompany, glitch, socket, $state, Auth) {
    var vm = this;

    vm.companys = [];
    vm.glitch = glitch;
    vm.getMany = getMany;
    vm.remove = remove;
    vm.authenticate = authenticate;
    vm.unauthenticate = unauthenticate;

    ////////////

    activate();

    function activate() {
      // code...
    }

    ////////////

    function getMany() {
      vm.glitch.reset();
      dataCompany.getMany()
        .then(function(companys) {
          vm.companys = companys;
        })
        .catch(vm.glitch.handle);
    }

    function remove(company) {
      vm.glitch.reset();
      dataCompany.remove(company)
        .then(function() {
          vm.companys.forEach(function(elem, i, array) {
            if (array[i]._id === company._id) {
              array.splice(i, 1);
            }
          });
          vm.glitch.setSuccess('Successfully deleted company');
        })
        .catch(vm.glitch.handle);
    }

    function authenticate(company) {
      vm.glitch.reset();
      company.authenticated = true;
      dataCompany.update(company)
        .then(function() {
          vm.glitch.setSuccess('Successfully authenticated company');
        })
        .catch(vm.glitch.handle);
    }

    function unauthenticate(company) {
      vm.glitch.reset();
      company.authenticated = false;
      dataCompany.update(company)
        .then(function() {
          vm.glitch.setSuccess('Successfully unauthenticated company');
        })
        .catch(vm.glitch.handle);
    }
  }
})();
