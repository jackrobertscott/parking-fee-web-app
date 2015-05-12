'use strict';

angular.module('webApp')
  .controller('VehicleCtrl', function ($scope, $state, $stateParams, Vehicle, Auth) {
    $scope.response = {};
    $scope.vehicle = {};
    $scope.vehicles = [];
    $scope.makes = ['Ford', 'Holden', 'Mazda', 'Suburu', 'Ferrari', 'Other'];
    $scope.types = ['Sedan', 'Hatchback', 'Utility', 'Bus'];
    $scope.colors = ['Red', 'Blue', 'Yellow', 'Green', 'Orange', 'Purple', 'White', 'Black'];

    /**
     * Get all vehicles registered to the user
     */
    $scope.find = function() {
      Auth.getCurrentUser().vehicles.forEach(function(vehicleId) {
        Vehicle.get({ id: vehicleId },
        function (vehicle) {
          $scope.vehicles.push(vehicle);
        }, errorHandler);
      });
    };

    /**
     * Find one vehicle by id in state params
     */
    $scope.findOne = function() {
      Vehicle.get({ id: $stateParams.id },
      function(vehicle) {
        $scope.vehicle = vehicle;
      }, errorHandler);
    };

    /**
     * Go to the vehicle settings page
     */
    $scope.toSettings = function(vehicle) {
      $state.go('vehicleSettings', {
        id: vehicle._id
      });
    };

    /**
     * Register a new vehicle
     */
    $scope.register = function(form) {
      $scope.submitted = true;
      reset();

      if (form.$valid) {
        var user = Auth.getCurrentUser();
        angular.extend($scope.vehicle, {
          _creator: user._id
        });
        var vehicle = new Vehicle($scope.vehicle);
        vehicle.$save(function (vehicle) {
          user.vehicle = vehicle._id;
          user.$update(function() {
            $state.go('vehicle');
          }, errorHandler);
        }, errorHandler);
      }
    };

    /**
     * Update a vehicle
     */
    $scope.update = function(form) {
      $scope.submitted = true;
      reset();

      if (form.$valid && $scope.vehicle) {
        $scope.vehicle.$update(function() {
          $scope.response.good = 'Details successfully updated';
  			}, errorHandler);
      }
    };

    /**
     * Remove a vehicle
     * TODO: should move to archive database instead of delete
     */
		$scope.remove = function(vehicle) {
			if (vehicle) {
        vehicle.$remove(function () {
          $scope.response.good = 'Vehicle successfully deleted';
        }, errorHandler);
        // Remove from view
        $scope.vehicles.forEach(function(element, i, array) {
          if (array[i] === vehicle) {
						array.splice(i, 1);
          }
        });
			} else {
				vehicle = $scope.vehicle;
        vehicle.$remove(function () {
          $state.go('vehicle');
        }, errorHandler);
			}
		};

    /**
     * Reset response object
     */
    var reset = function () {
      $scope.response = {};
    };

    /**
     * A error handling function
     */
    var errorHandler = function (err) {
      console.log(err.data);
      $scope.response.bad = 'An error has occurred, we apologise for this inconvenience';
    };
  });
