'use strict';

angular.module('webApp')
  .controller('LocationOverviewCtrl', function ($scope, tracto, locationCurator, $state, Auth) {
    $scope.tracto = tracto;
  });
