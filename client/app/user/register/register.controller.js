'use strict';

angular.module('webApp')
  .controller('UserRegisterCtrl', function ($scope, tracto, User, $state, Auth) {
    $scope.tracto = tracto;
    $scope.user = {};

    $scope.register = function(form) {
      $scope.submitted = true;
      $scope.tracto.reset();

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
          $scope.tracto.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.tracto.errors[field] = error.message;
          });
        });
      }
    };
  });
