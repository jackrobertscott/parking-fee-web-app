'use strict';

angular.module('webApp')
  .controller('LocationCompanyCtrl', function ($scope, tracto, locationCurator, $state, Auth) {
    $scope.tracto = tracto;
  });
