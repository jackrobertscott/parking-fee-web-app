'use strict';

angular.module('webApp')
  .controller('UserCtrl', function ($scope, $state, $window, Auth, User) {
    $scope.response = {};
    $scope.user = {};
    $scope.users = [];

    $scope.find = function() {
      $scope.users = User.query();
    };

    $scope.findOne = function() {
      $scope.user = Auth.getCurrentUser();
    };

    $scope.login = function(form) {
      $scope.submitted = true;
      reset();

      if (form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then(function() {
          // Logged in, redirect to home
          $state.go('main');
        })
        .catch(function(err) {
          $scope.response.errors.other = err.message;
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };

    $scope.register = function(form) {
      $scope.submitted = true;
      reset();

      if (form.$valid) {
        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then(function() {
          // Account created, redirect to home
          $state.go('main');
        })
        .catch(function(err) {
          err = err.data;
          $scope.response.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.response.errors[field] = error.message;
          });
        });
      }
    };

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      reset();

      if (form.$valid) {
        Auth.changePassword($scope.user.oldPassword, $scope.user.newPassword)
        .then(function() {
          $scope.response.good = 'Password successfully changed.';
        })
        .catch(function() {
          form.password.$setValidity('mongoose', false);
          $scope.response.errors.other = 'Incorrect password';
          $scope.response.good = '';
        });
      }
		};

    $scope.delete = function(user) {
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };

    /**
     * Reset response object
     */
    var reset = function () {
      $scope.response = {};
    };

    /**
     * A error handling function
     */
    var errorHandler = function (err) {
      console.log(err);
      $scope.response.bad = 'An error has occurred, we apologise for this inconvenience';
    };
  });
