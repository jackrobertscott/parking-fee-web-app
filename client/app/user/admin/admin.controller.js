'use strict';

angular.module('webApp')
  .controller('UserAdminCtrl', function ($scope, tracto, User, $state, Auth) {
    $scope.tracto = tracto;
    $scope.users = [];

    $scope.find = function() {
      $scope.users = User.query();
    };

    $scope.delete = function(user) {
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };
  });
