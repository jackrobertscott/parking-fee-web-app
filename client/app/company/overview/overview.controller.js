'use strict';

angular.module('webApp')
  .controller('CompanyOverviewCtrl', function ($scope, tracto, Company, $state, Auth) {
    $scope.tracto = tracto;
  });
