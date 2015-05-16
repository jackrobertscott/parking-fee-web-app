'use strict';

angular.module('webApp')
  .controller('UserLoginCtrl', function ($scope, tracto, User, $state, Auth, $window) {
    $scope.tracto = tracto;
    $scope.user = {};

    $scope.login = function(form) {
      $scope.submitted = true;
      $scope.tracto.reset();

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
          $scope.tracto.errors.other = err.message;
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
