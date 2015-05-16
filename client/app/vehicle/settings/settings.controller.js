'use strict';

angular.module('webApp')
  .controller('VehicleSettingsCtrl', function ($scope, tracto, Vehicle, $state, Auth) {
    $scope.tracto = tracto;
  });
