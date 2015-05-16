'use strict';

angular.module('webApp')
  .controller('VehicleRegisterCtrl', function ($scope, tracto, vehicleCurator, $state, Auth) {
    $scope.tracto = tracto;
  });
