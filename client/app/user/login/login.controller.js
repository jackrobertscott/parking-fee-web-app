'use strict';

angular.module('webApp')
  .controller('UserLoginCtrl', function ($scope, tracto, userCurator, $state, Auth) {
    $scope.tracto = tracto;
  });
