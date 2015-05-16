'use strict';

angular.module('webApp')
  .controller('UserLogoutCtrl', function ($scope, tracto, userCurator, $state, Auth) {
    $scope.tracto = tracto;
  });
