'use strict';

angular.module('webApp')
  .controller('UserRegisterCtrl', function ($scope, tracto, userCurator, $state, Auth) {
    $scope.tracto = tracto;
  });
