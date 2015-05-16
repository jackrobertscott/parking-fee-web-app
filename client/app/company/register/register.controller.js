'use strict';

angular.module('webApp')
  .controller('CompanyRegisterCtrl', function ($scope, tracto, companyCurator, $state, Auth) {
    $scope.tracto = tracto;
  });
