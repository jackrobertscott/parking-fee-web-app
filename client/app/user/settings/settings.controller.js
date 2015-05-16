'use strict';

angular.module('webApp')
  .controller('UserSettingsCtrl', function ($scope, tracto, User, $state, Auth) {
    $scope.tracto = tracto;
  });
