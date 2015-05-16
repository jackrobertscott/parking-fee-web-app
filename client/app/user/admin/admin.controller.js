'use strict';

angular.module('webApp')
  .controller('UserAdminCtrl', function ($scope, tracto, userCurator, $state, Auth) {
    $scope.tracto = tracto;
  });
