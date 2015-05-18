'use strict';

angular.module('webApp')
  .controller('UserOverviewCtrl', function ($scope, tracto, User, $state, Auth) {
    $scope.tracto = tracto;
    $scope.users = [];

    $scope.find = function() {
      $scope.users = User.query();
    };
  });
