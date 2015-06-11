(function() {
  'use strict';

  angular
    .module('webApp')
    .controller('OneCompanyCtrl', OneCompanyCtrl);

  OneCompanyCtrl.$inject = ['dataCompany', 'glitch', '$state', 'Auth'];

  function OneCompanyCtrl(dataCompany, glitch, $state, Auth) {
    var vm = this;

    vm.item = {};
    vm.glitch = glitch;
    vm.submitted = false;
    vm.getOne = getOne;
    vm.create = create;
    vm.update = update;
    vm.remove = remove;

    ////////////

    activate();

    function activate() {
      // code...
    }

    ////////////

    function getOne(id) {
      vm.glitch.reset();
      id = id || Auth.getCurrentUser().company;
      dataCompany.getOne(id)
        .then(function(item) {
          vm.item = item;
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
        angular.extend(vm.item, {
          _creator: user._id,
          members: [user._id]
        });
        dataCompany.create(vm.item)
          .then(function(item) {
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
        dataCompany.update(vm.item)
          .then(function(item) {
            vm.glitch.setSuccess('Successfully updated');
          })
          .catch(vm.glitch.handle);
      }
    }

    function remove(form) {
      vm.glitch.reset();
      if (!form.$valid) {
        invalid();
      } else {
        dataCompany.remove(vm.item)
          .then(function() {
            vm.item = {};
            Auth.reloadUser(function() { // update user role in Auth
              $state.go('main');
            });
          })
          .catch(vm.glitch.handle);
      }
    }

    function invalid() {
      vm.submitted = true;
      vm.glitch.setError('Form is invalid');
    }
  }
})();