'use strict';

angular.module('webApp')
  .controller('VehicleRegisterCtrl', function ($scope, tracto, Vehicle, $state, Auth) {
    $scope.tracto = tracto;
    $scope.vehicle = {};
    $scope.makes = ['Ford', 'Holden', 'Mazda', 'Suburu', 'Ferrari', 'Other'];
    $scope.types = ['Sedan', 'Hatchback', 'Utility', 'Bus'];
    $scope.colors = ['Red', 'Blue', 'Yellow', 'Green', 'Orange', 'Purple', 'White', 'Black'];
    $scope.vehicle.make = $scope.makes[0];
    $scope.vehicle.type = $scope.types[0];
    $scope.vehicle.color = $scope.colors[0];

    $scope.register = function(form) {
      $scope.submitted = true;
      $scope.tracto.reset();

      if (form.$valid) {
        var user = Auth.getCurrentUser();
        angular.extend($scope.vehicle, {
          _creator: user._id
        });
        var vehicle = new Vehicle($scope.vehicle);
        vehicle.$save(function (vehicle) {
          user.vehicles.push(vehicle._id);
          user.$update(function() {
            $state.go('vehicle');
          }, $scope.tracto.handle);
        }, $scope.tracto.handle);
      }
    };
  });
