'use strict';

angular.module('webApp')
  .controller('UserAdminCtrl', function ($scope, tracto, User, $state, Auth) {
    $scope.tracto = tracto;
  });
