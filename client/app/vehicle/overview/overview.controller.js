'use strict';

angular.module('webApp')
  .controller('VehicleOverviewCtrl', function ($scope, tracto, Vehicle, $state, Auth) {
    $scope.tracto = tracto;
  });
