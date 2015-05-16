'use strict';

angular.module('webApp')
  .controller('UserRegisterCtrl', function ($scope, tracto, User, $state, Auth) {
    $scope.tracto = tracto;
  });
