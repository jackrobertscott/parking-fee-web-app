'use strict';

angular.module('webApp')
  .controller('LocationCompanyCtrl', function ($scope, tracto, Location, Company, $state, Auth) {
    $scope.tracto = tracto;

    $scope.findFew = function() {
      if (!Auth.getCurrentUser().company) {
        $state.go('companyRegister');
      } else {
        Location.query({ company: Auth.getCurrentUser().company },
        function(locations) {
          $scope.locations = locations;
        }, $scope.tracto.handle);
      }
    };

    $scope.toSettings = function(location) {
      $state.go('locationSettings', {
        id: location._id
      });
    };

    $scope.remove = function(location) {
      Company.get({ id: location.company }, function(company) {
        company.locations.forEach(function(element, i, array) {
          if (array[i] === location) {
             array.splice(i, 1);
          }
        });
        company.$update(function() {
          location.$remove(function () {
            $scope.tracto.good = 'Vehicle successfully deleted';
          }, $scope.tracto.handle);
        }, $scope.tracto.handle);
      }, $scope.tracto.handle);
      // Remove from view
      $scope.locations.forEach(function(element, i, array) {
        if (array[i] === location) {
           array.splice(i, 1);
        }
      });
 		};
  });
