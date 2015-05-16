'use strict';

angular.module('webApp')
  .controller('CompanyAdminCtrl', function ($scope, tracto, Company, $state, Auth) {
    $scope.tracto = tracto;
  });
