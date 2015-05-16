'use strict';

angular.module('webApp')
  .controller('UserLoginCtrl', function ($scope, tracto, User, $state, Auth) {
    $scope.tracto = tracto;
  });
