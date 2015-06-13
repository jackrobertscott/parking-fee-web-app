(function() {
  'use strict';

  angular
    .module('webApp')
    .controller('UserCtrl', UserCtrl);

  UserCtrl.$inject = ['dataUser', 'glitch', '$state', 'Auth'];

  function UserCtrl(dataUser, glitch, $state, Auth) {
    var vm = this;

    vm.user = {};
    vm.users = [];
    vm.submitted = false;
    vm.glitch = glitch;
    vm.getMany = getMany;
    vm.getOne = getOne;
    vm.create = create;
    vm.update = update;
    vm.login = login;
    vm.loginOauth = loginOauth;
    vm.logout = logout;
    vm.changePassword = changePassword;
    // vm.remove = remove;

    ////////////

    activate();

    function activate() {
      // code...
    }

    ////////////

    function getMany() {
      vm.glitch.reset();
      dataUser.getMany()
        .then(function(users) {
          vm.users = users;
        })
        .catch(vm.glitch.handle);
    }

    function getOne(id) {
      vm.glitch.reset();
      id = id || Auth.getCurrentUser()._id;
      dataUser.getOne(id)
        .then(function(user) {
          vm.user = user;
        })
        .catch(vm.glitch.handle);
    }

    function create(form) {
      vm.glitch.reset();
      vm.submitted = true;
      if (!form.$valid) {
        invalid();
      } else {
        Auth.createUser(vm.user)
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
        dataUser.update(vm.user)
          .then(function(user) {
            vm.glitch.setSuccess('Successfully updated');
          })
          .catch(vm.glitch.handle);
      }
    }

    // function remove(user) {
    //   vm.glitch.reset();
    //   dataUser.remove(user)
    //     .then(function() {
    //       vm.users.forEach(function(elem, i, array) {
    //         if (array[i]._id === user._id) {
    //           array.splice(i, 1);
    //         }
    //       });
    //       vm.glitch.setSuccess('Successfully deleted user');
    //     })
    //     .catch(vm.glitch.handle);
    // }
    //
    // function remove(form) {
    //   vm.glitch.reset();
    //   if (!form.$valid) {
    //     invalid();
    //   } else {
    //     dataUser.remove(vm.user)
    //       .then(function() {
    //         vm.user = {};
    //         logout();
    //       })
    //       .catch(vm.glitch.handle);
    //   }
    // }

    function login(form) {
      vm.glitch.reset();
      vm.submitted = true;
      if (!form.$valid) {
        invalid();
      } else {
        Auth.login(vm.user)
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
        Auth.changePassword(vm.user.oldPassword, vm.user.newPassword)
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
