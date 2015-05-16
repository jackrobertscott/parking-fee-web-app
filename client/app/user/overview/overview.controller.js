'use strict';

angular.module('webApp')
  .controller('UserOverviewCtrl', function ($scope, tracto, userCurator, $state, Auth) {
    $scope.tracto = tracto;
  });
