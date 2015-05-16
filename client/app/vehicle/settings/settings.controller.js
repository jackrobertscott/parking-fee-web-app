'use strict';

angular.module('webApp')
  .controller('VehicleSettingsCtrl', function ($scope, tracto, Vehicle, $state, $stateParams, Auth) {
    $scope.tracto = tracto;
    $scope.vehicle = {};

    $scope.findOne = function() {
      Vehicle.get({ id: $stateParams.id },
      function(vehicle) {
        $scope.vehicle = vehicle;
      }, $scope.tracto.handle);
    };

    $scope.update = function(form) {
      $scope.submitted = true;
      $scope.tracto.reset();

      if (form.$valid && $scope.vehicle) {
        $scope.vehicle.$update(function() {
          $scope.tracto.good = 'Details successfully updated';
  			}, $scope.tracto.handle);
      }
    };

    $scope.remove = function() {
      $scope.vehicle.$remove(function () {
        $state.go('vehicle');
      }, $scope.tracto.handle);
		};
  });
