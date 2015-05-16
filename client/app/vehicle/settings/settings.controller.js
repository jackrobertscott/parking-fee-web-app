'use strict';

angular.module('webApp')
  .controller('VehicleSettingsCtrl', function ($scope, tracto, vehicleCurator, $state, Auth) {
    $scope.tracto = tracto;
  });
