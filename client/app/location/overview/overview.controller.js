'use strict';

angular.module('webApp')
  .controller('LocationOverviewCtrl', function ($scope, tracto, Location, $state, Auth) {
    $scope.tracto = tracto;
  });
