'use strict';

angular.module('webApp')
  .controller('UserSettingsCtrl', function ($scope, tracto, userCurator, $state, Auth) {
    $scope.tracto = tracto;
  });
