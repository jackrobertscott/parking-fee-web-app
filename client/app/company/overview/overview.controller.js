'use strict';

angular.module('webApp')
  .controller('CompanyOverviewCtrl', function ($scope, tracto, companyCurator, $state, Auth) {
    $scope.tracto = tracto;
  });
