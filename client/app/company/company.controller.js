(function() {
  'use strict';

  angular
    .module('webApp')
    .controller('CompanyCtrl', CompanyCtrl);

  CompanyCtrl.$inject = ['dataCompany', 'glitch', 'socket', '$state', 'Auth'];

  function CompanyCtrl(dataCompany, glitch, socket, $state, Auth) {
    var vm = this;

    vm.company = {};
    vm.companys = [];
    vm.submitted = false;
    vm.users = [];
    vm.glitch = glitch;
    vm.getMany = getMany;
    vm.authenticate = authenticate;
    vm.unauthenticate = unauthenticate;
    vm.getOne = getOne;
    vm.create = create;
    vm.update = update;
    // vm.remove = remove;

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
          vm.company = companys[0] || {};
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

    function getOne(id) {
      vm.glitch.reset();
      id = id || Auth.getCurrentUser().company;
      dataCompany.getOne(id)
        .then(function(company) {
          vm.company = company;
        })
        .catch(vm.glitch.handle);
    }

    function create(form) {
      vm.glitch.reset();
      vm.submitted = true;
      if (!form.$valid) {
        invalid();
      } else {
        var user = Auth.getCurrentUser();
        angular.extend(vm.company, {
          _creator: user._id,
          members: [user._id]
        });
        dataCompany.create(vm.company)
          .then(function(company) {
            Auth.reloadUser(function() { // update user role in Auth
              $state.go('companyMembers');
            });
          })
          .catch(vm.glitch.handle);
      }
    }

    function update(form) {
      vm.glitch.reset();
      vm.submitted = true;
      if (!form.$valid) {
        invalid();
      } else {
        dataCompany.update(vm.company)
          .then(function(company) {
            vm.glitch.setSuccess('Successfully updated');
          })
          .catch(vm.glitch.handle);
      }
    }

    // function remove(company) {
    //   vm.glitch.reset();
    //   dataCompany.remove(company)
    //     .then(function() {
    //       vm.companys.forEach(function(elem, i, array) {
    //         if (array[i]._id === company._id) {
    //           array.splice(i, 1);
    //         }
    //       });
    //       vm.glitch.setSuccess('Successfully deleted company');
    //     })
    //     .catch(vm.glitch.handle);
    // }
    //
    // function remove(form) {
    //   vm.glitch.reset();
    //   if (!form.$valid) {
    //     invalid();
    //   } else {
    //     dataCompany.remove(vm.company)
    //       .then(function() {
    //         vm.company = {};
    //         Auth.reloadUser(function() { // update user role in Auth
    //           $state.go('main');
    //         });
    //       })
    //       .catch(vm.glitch.handle);
    //   }
    // }

    function invalid() {
      vm.submitted = true;
      vm.glitch.setError('Form is invalid');
    }
  }
})();
