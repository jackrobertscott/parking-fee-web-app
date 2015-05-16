'use strict';

angular.module('webApp')
  .controller('LocationRegisterCtrl', function ($scope, tracto, locationCurator, $state, Auth) {
    $scope.tracto = tracto;
  });
