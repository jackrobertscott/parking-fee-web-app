'use strict';

angular.module('webApp')
  .controller('VehicleOverviewCtrl', function ($scope, tracto, Vehicle, $state, Auth) {
    $scope.tracto = tracto;
    $scope.vehicles = [];

    $scope.find = function() {
      $scope.vehicles = Vehicle.query();
    };
  });
