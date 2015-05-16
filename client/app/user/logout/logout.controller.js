'use strict';

angular.module('webApp')
  .controller('UserLogoutCtrl', function ($scope, tracto, User, $state, Auth) {
    $scope.tracto = tracto;
    $scope.user = {};

    $scope.logout = function() {
      Auth.logout();
      $state.go('userLogin');
    };
  });
