'use strict';

angular.module('webApp')
  .controller('VehicleUserCtrl', function ($scope, tracto, Vehicle, $state, Auth) {
    $scope.tracto = tracto;
    $scope.vehicles = [];

    $scope.findFew = function() {
      Auth.getCurrentUser().vehicles.forEach(function(vehicleId) {
        Vehicle.get({ id: vehicleId },
        function (vehicle) {
          $scope.vehicles.push(vehicle);
        }, $scope.tracto.handle);
      });
    };

    $scope.toSettings = function(vehicle) {
      $state.go('vehicleSettings', {
        id: vehicle._id
      });
    };

    $scope.remove = function(vehicle) {
      vehicle.$remove(function () {
        $scope.tracto.good = 'Vehicle successfully deleted';
      }, $scope.tracto.handle);
      // Remove from view
      $scope.vehicles.forEach(function(element, i, array) {
        if (array[i] === vehicle) {
          array.splice(i, 1);
        }
      });
		};
  });
