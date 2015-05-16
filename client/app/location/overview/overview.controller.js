'use strict';

angular.module('webApp')
  .controller('LocationOverviewCtrl', function ($scope, tracto, Location, $state, Auth) {
    $scope.tracto = tracto;

    $scope.find = function() {
      Location.query(function(locations) {
        $scope.locations = locations;
      }, $scope.tracto.handle);
    };
  });
