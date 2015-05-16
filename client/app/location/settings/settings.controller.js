'use strict';

angular.module('webApp')
  .controller('LocationSettingsCtrl', function ($scope, tracto, locationCurator, $state, Auth) {
    $scope.tracto = tracto;
  });
