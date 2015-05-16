'use strict';

angular.module('webApp')
  .controller('CompanyAdminCtrl', function ($scope, tracto, companyCurator, $state, Auth) {
    $scope.tracto = tracto;
  });
