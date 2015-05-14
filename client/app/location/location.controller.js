'use strict';

angular.module('webApp')
  .controller('LocationCtrl', function ($scope, $state, $stateParams, Location, Company, Auth) {
    $scope.response = {};
    $scope.location = {};
    $scope.locations = [];

    /**
     * Find all locations
     */
    $scope.find = function() {
      Location.query(function(locations) {
        $scope.locations = locations;
      }, errorHandler);
    };

    /**
     * Find all locations registered to the user's company
     */
    $scope.findFew = function() {
      if (!Auth.getCurrentUser().company) {
        $state.go('main');
      } else {
        Location.query({ company: Auth.getCurrentUser().company },
        function(locations) {
          $scope.locations = locations;
        }, errorHandler);
      }
    };

    /**
     * Find one location by id in state params
     */
    $scope.findOne = function() {
      if (!Auth.getCurrentUser().company) {
        $state.go('main');
      } else {
        Location.get({ id: $stateParams.id },
        function(location) {
          location.start = new Date(location.start);
          location.end = new Date(location.end);
          $scope.location = location;
        }, errorHandler);
      }
    };

    /**
     * Go to the location settings page
     */
    $scope.toSettings = function(location) {
      $state.go('locationSettings', {
        id: location._id
      });
    };

    /**
     * Register a new location
     */
    $scope.register = function(form) {
      $scope.submitted = true;
      reset();

      if (form.$valid) {
        var user = Auth.getCurrentUser();
        angular.extend($scope.location, {
          _creator: user._id,
          company: user.company
        });
        var location = new Location($scope.location);
        location.$save(function() {
          Company.get({ id: user.company },
          function(company) {
            company.locations.push(location._id);
            company.$update(function() {
              $state.go('location');
            }, errorHandler);
          }, errorHandler);
        }, errorHandler);
      }
    };

    /**
     * Update a location
     */
    $scope.update = function(form) {
      $scope.submitted = true;
      reset();

      if (form.$valid && $scope.location) {
        $scope.location.$update(function() {
          $scope.response.good = 'Details successfully updated';
  			}, errorHandler);
      }
    };

    /**
     * Remove a location
     * TODO: should move to archive database instead of delete
     */
    $scope.remove = function(location) {
 			if (location) {
        Company.get({ id: location.company }, function(company) {
          company.locations.forEach(function(element, i, array) {
            if (array[i] === location) {
   					  array.splice(i, 1);
            }
          });
          company.$update(function() {
            location.$remove(function () {
              $scope.response.good = 'Vehicle successfully deleted';
            }, errorHandler);
          }, errorHandler);
        }, errorHandler);
        // Remove from view
        $scope.locations.forEach(function(element, i, array) {
          if (array[i] === location) {
 					  array.splice(i, 1);
          }
        });
 			} else {
 				location = $scope.location;
        Company.get({ id: location.company }, function(company) {
          company.locations.forEach(function(element, i, array) {
            if (array[i] === location) {
    				  array.splice(i, 1);
            }
          });
          company.$update(function() {
            location.$remove(function () {
              $scope.response.good = 'Vehicle successfully deleted';
            }, errorHandler);
          }, errorHandler);
        }, errorHandler);
        $state.go('location');
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
      console.log(err);
      $scope.response.bad = 'An error has occurred, we apologise for this inconvenience';
    };
  });
