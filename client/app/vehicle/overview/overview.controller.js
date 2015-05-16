'use strict';

angular.module('webApp')
  .controller('VehicleOverviewCtrl', function ($scope, tracto, vehicleCurator, $state, Auth) {
    $scope.tracto = tracto;
  });
