(function() {
  'use strict';

  angular
    .module('webApp')
    .controller('OneUserCtrl', OneUserCtrl);

  OneUserCtrl.$inject = ['dataUser', 'glitch', '$state', 'Auth'];

  function OneUserCtrl(dataUser, glitch, $state, Auth) {
    var vm = this;

    vm.session = {};
    vm.glitch = glitch;
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

    function activate() {
      // code...
    }

    ////////////

    function getOne(id) {
      vm.glitch.reset();
      id = id || Auth.getCurrentUser()._id;
      dataUser.getOne(id)
        .then(function(session) {
          vm.session = session;
        })
        .catch(vm.glitch.handle);
    }

    function create(form) {
      vm.glitch.reset();
      vm.submitted = true;
      if (!form.$valid) {
        invalid();
      } else {
        Auth.createUser(vm.session)
          .then(function() {
            $state.go('app.vehicle.register');
          })
          .catch(function(err) {
            err = err.data;
            // Update validity of form fields that match the mongoose errors
            angular.forEach(err.errors, function(error, field) {
              form[field].$setValidity('mongoose', false);
              vm.glitch.setError(error.message);
            });
          });
      }
    }

    function update(form) {
      vm.glitch.reset();
      vm.submitted = true;
      if (!form.$valid) {
        invalid();
      } else {
        dataUser.update(vm.session)
          .then(function(session) {
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
        dataUser.remove(vm.session)
          .then(function() {
            vm.session = {};
            logout();
          })
          .catch(vm.glitch.handle);
      }
    }

    function login(form) {
      vm.glitch.reset();
      vm.submitted = true;
      if (!form.$valid) {
        invalid();
      } else {
        Auth.login(vm.session)
          .then(function() {
            $state.go('app.vehicle.register');
          })
          .catch(function(err) {
            vm.glitch.setError(err.message);
          });
      }
    }

    function loginOauth(provider) {
      Auth.loginOauth(provider);
    }

    function logout() {
      Auth.logout();
      $state.go('login');
    }

    function changePassword(form) {
      vm.glitch.reset();
      vm.submitted = true;
      if (!form.$valid) {
        invalid();
      } else {
        Auth.changePassword(vm.session.oldPassword, vm.session.newPassword)
          .then(function() {
            vm.glitch.setSuccess('Password successfully changed.');
          })
          .catch(function() {
            form.password.$setValidity('mongoose', false);
            vm.glitch.setError('Incorrect password');
          });
      }
    }

    function invalid() {
      vm.submitted = true;
      vm.glitch.setError('Form is invalid');
    }
  }
})();
