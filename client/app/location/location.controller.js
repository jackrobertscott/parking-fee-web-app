'use strict';

angular.module('webApp')
  .controller('LocationCtrl', function ($scope, $state, $stateParams, Location, Company, Auth) {
    $scope.errors = [];
    $scope.message = '';
    $scope.location = {};
    $scope.locations = [];

    /**
     * Get all locations registered to the user's company
     */
    $scope.find = function() {
      var companyId = Auth.getCurrentUser().company;

      if (!companyId) {
        $state.go('main');
      } else {
        $scope.locations = Location.query({ company: companyId }).$promise().catch(errorHandler);
      }
    };

    /**
     * Find one location by id in state params
     */
    $scope.findOne = function() {
      $scope.location = Location.get({
        id: $stateParams.id
      }).$promise.catch(errorHandler);
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
        var companyId = Auth.getCurrentUser().company;
        $scope.location._creator = user._id;
        $scope.location.company = companyId;
        var location = new Location($scope.location);
        location.$save(function() {
          var company = Company.get({ id: company._id });
          if (!company.locations.length) {
            company.locations = [location._id];
          } else {
            company.locations.push(location._id);
          }
          company.$save().$promise.catch(errorHandler);
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
          $scope.message = 'Details successfully updated';
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
            location.$remove().$promise.catch(errorHandler);
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
            location.$remove().$promise.catch(errorHandler);
          }, errorHandler);
        }, errorHandler);
        $scope.location = {};
        $state.go('location');
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
