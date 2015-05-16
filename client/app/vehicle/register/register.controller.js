'use strict';

angular.module('webApp')
  .controller('VehicleRegisterCtrl', function ($scope, tracto, Vehicle, $state, Auth) {
    $scope.tracto = tracto;
  });
