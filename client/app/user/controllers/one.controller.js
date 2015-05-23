(function() {
  'use strict';

  angular
  .module('webApp')
  .controller('OneUserCtrl', OneUserCtrl);

  OneUserCtrl.$inject = ['dataUser', 'tracto', '$state', 'Auth', '$window'];

  function OneUserCtrl(dataUser, tracto, $state, Auth, $window) {
    var vm = this;

    vm.item = {};
    vm.tracto = tracto;
    vm.submitted = false;
    vm.getOne = getOne;
    vm.create = create;
    vm.update = update;
    vm.remove = remove;
    vm.login = login;
    vm.loginOauth = loginOauth;
    vm.logout = logout;
    vm.changePassword = changePassword;

    ////////////

    activate();

    ////////////

    function activate() {
      // code
    }

    function getOne(id) {
      vm.tracto.reset();
      id = id || Auth.getCurrentUser()._id;
      dataUser.getOne(id).then(function(item) {
        vm.item = item;
      }).catch(vm.tracto.handle);
    }

    function create(form) {
      vm.tracto.reset();
      vm.submitted = true;
      if (!form.$valid) {
        invalid();
      } else {
        Auth.createUser({
          name: vm.item.name,
          email: vm.item.email,
          password: vm.item.password
        })
        .then(function() {
          $state.go('vehicleRegister');
        })
        .catch(function(err) {
          err = err.data;
          vm.tracto.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            vm.tracto.errors[field] = error.message;
          });
        });
      }
    }

    function update(form) {
      vm.tracto.reset();
      vm.submitted = true;
      if (!form.$valid) {
        invalid();
      } else {
        return dataUser.update(vm.item).then(function(item) {
          vm.tracto.good = 'Successfully updated';
        }).catch(vm.tracto.handle);
      }
    }

    function remove(form) {
      vm.tracto.reset();
      if (!form.$valid) {
        invalid();
      } else {
        dataUser.remove(vm.item).then(function() {
          vm.item = {};
          $state.go('main');
        }).catch(vm.tracto.handle);
      }
    }

    function login(form) {
      vm.tracto.reset();
      vm.submitted = true;
      if (!form.$valid) {
        invalid();
      } else {
        Auth.login({
          email: vm.item.email,
          password: vm.item.password
        })
        .then(function() {
          $state.go('main');
        })
        .catch(function(err) {
          vm.tracto.errors.other = err.message;
        });
      }
    }

    function loginOauth(provider) {
      $window.location.href = '/auth/' + provider;
    }

    function logout() {
      Auth.logout();
      $state.go('userLogin');
    }

    function changePassword(form) {
      vm.tracto.reset();
      vm.submitted = true;
      if (!form.$valid) {
        invalid();
      } else {
        Auth.changePassword(vm.item.oldPassword, vm.item.newPassword)
        .then(function() {
          vm.tracto.good = 'Password successfully changed.';
        })
        .catch(function() {
          form.password.$setValidity('mongoose', false);
          vm.tracto.errors.other = 'Incorrect password';
        });
      }
    }

    function invalid() {
      vm.submitted = true;
      vm.tracto.bad = 'Form is invalid';
    }
  }
})();
