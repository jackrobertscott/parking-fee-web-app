'use strict';

angular.module('webApp')
  .controller('LocationSettingsCtrl', function ($scope, tracto, Location, Company, $state, $stateParams, Auth) {
    $scope.tracto = tracto;
    $scope.location = {};

    $scope.findOne = function() {
      if (!Auth.getCurrentUser().company) {
        $state.go('main');
      } else {
        Location.get({ id: $stateParams.id },
        function(location) {
          location.start = new Date(location.start);
          location.end = new Date(location.end);
          $scope.location = location;
        }, $scope.tracto.handle);
      }
    };

    $scope.update = function(form) {
      $scope.submitted = true;
      $scope.tracto.reset();

      if (form.$valid && $scope.location) {
        $scope.location.$update(function() {
          $scope.tracto.good = 'Details successfully updated';
  			}, $scope.tracto.handle);
      }
    };

    $scope.remove = function() {
      Company.get({ id: $scope.location.company }, function(company) {
        company.locations.forEach(function(element, i, array) {
          if (array[i] === location) {
            array.splice(i, 1);
          }
        });
        company.$update(function() {
          location.$remove(function () {
            $scope.location = {};
            $state.go('location');
          }, $scope.tracto.handle);
        }, $scope.tracto.handle);
      }, $scope.tracto.handle);
 		};
  });
