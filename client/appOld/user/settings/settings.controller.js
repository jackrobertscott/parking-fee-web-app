'use strict';

angular.module('webApp')
  .controller('UserSettingsCtrl', function ($scope, tracto, User, $state, Auth) {
    $scope.tracto = tracto;
    $scope.user = {};

    $scope.findOne = function() {
      $scope.user = Auth.getCurrentUser();
    };

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      $scope.tracto.reset();

      if (form.$valid) {
        Auth.changePassword($scope.user.oldPassword, $scope.user.newPassword)
        .then(function() {
          $scope.tracto.good = 'Password successfully changed.';
        })
        .catch(function() {
          form.password.$setValidity('mongoose', false);
          $scope.tracto.errors.other = 'Incorrect password';
          $scope.tracto.good = '';
        });
      }
		};
  });
