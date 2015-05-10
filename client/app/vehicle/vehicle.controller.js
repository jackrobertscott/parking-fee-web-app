'use strict';

angular.module('webApp')
  .controller('VehicleCtrl', function ($scope, $state, $stateParams, Vehicle, Auth) {
    $scope.errors = [];
    $scope.message = '';
    $scope.vehicle = {};
    $scope.vehicles = [];
    $scope.makes = ['Ford', 'Holden', 'Mazda', 'Suburu', 'Ferrari', 'Other'];
    $scope.types = ['Sedan', 'Hatchback', 'Utility', 'Bus'];
    $scope.colors = ['Red', 'Blue', 'Yellow', 'Green', 'Orange', 'Purple', 'White', 'Black'];

    /**
     * Get all vehicles registered to the user
     */
    $scope.find = function() {
      var vehicles = Auth.getCurrentUser().vehicles;

      if (!vehicles.length) {
        $scope.message = 'You have no registered vehicles';
      } else {
        vehicles.forEach(function (vehicleId) {
          Vehicle.get({ id: vehicleId }).$promise
          .then(function (vehicle) {
            $scope.vehicles.push(vehicle);
          })
          .catch(errorHandler);
        });
      }
    };

    /**
     * Find one vehicle by id in state params
     */
    $scope.findOne = function() {
      $scope.vehicle = Vehicle.get({
        id: $stateParams.id
      }).$promise.catch(errorHandler);
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
        $scope.vehicle._creator = Auth.getCurrentUser()._id;
        var vehicle = new Vehicle($scope.vehicle);
        vehicle.$save(function (vehicle) {
          Auth.addVehicle(vehicle)
          .then(function() {
            $state.go('vehicle');
          })
          .catch(errorHandler);
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
          $scope.message = 'Details successfully updated';
  			}, errorHandler);
      }
    };

    /**
     * Remove a vehicle
     * TODO: should move to archive database instead of delete
     */
		$scope.remove = function(vehicle) {
			if (vehicle) {
        Auth.removeVehicle(vehicle)
        .then(function() {
          vehicle.$remove().$promise.catch(errorHandler);
        })
        .catch(errorHandler);
        // Remove from view
        $scope.vehicles.forEach(function(element, i, array) {
          if (array[i] === vehicle) {
						array.splice(i, 1);
          }
        });
			} else {
				vehicle = $scope.vehicle;
        Auth.removeVehicle(vehicle)
        .then(function() {
          vehicle.$remove().$promise
          .then(function() {
            $scope.vehicle = {};
          })
          .catch(errorHandler);
        })
        .catch(errorHandler);
        $scope.vehicle = {};
        $state.go('vehicle');
			}
		};

    /**
     * Reset a errors and message in form
     */
    var reset = function () {
      $scope.errors = [];
      $scope.message = '';
    };

    /**
     * A error handling function
     */
    var errorHandler = function (err) {
      $scope.errors.push(err.data);
    };
  });
