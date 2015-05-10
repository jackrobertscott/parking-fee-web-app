'use strict';

angular.module('webApp')
  .controller('VehicleCtrl', function ($scope, $state, Vehicle, Auth) {
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
        vehicles.forEach(function (vehicle) {
          $scope.vehicles.push(Vehicle.get({ id: vehicle._id }));
        });
      }
    };

    /**
     * Find one vehicle by id in state params
     */
    $scope.findOne = function() {
      $scope.vehicle = Vehicle.get({
        id: $state.params('id')
      });
    };

    /**
     * Register a new vehicle
     */
    $scope.register = function(form) {
      $scope.submitted = true;
      reset();

      if (form.$valid) {
        var vehicle = new Vehicle($scope.vehicle);

        vehicle.$save(function (res) {
          Auth.addVehicle(res)
          .then(function() {
            $state.go('vehicle');
          })
          .catch(function(err) {
    				$scope.errors.push(err.data);
          });
        }, function (err) {
  				$scope.errors.push(err.data);
        });
      }
    };

    /**
     * Update a vehicle
     */
    $scope.update = function(form) {
      $scope.submitted = true;
      reset();

      if (form.$valid) {
        var vehicle = $scope.vehicle;
        vehicle.$update(function() {
          $scope.message = 'Details successfully updated';
  			}, function(err) {
  				$scope.errors.push(err.data);
  			});
      }
    };

    /**
     * Reset a errors and message in form
     */
    var reset = function () {
      $scope.errors = [];
      $scope.message = '';
    };
  });
