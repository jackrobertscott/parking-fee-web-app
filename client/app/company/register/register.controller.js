'use strict';

angular.module('webApp')
  .controller('CompanyRegisterCtrl', function ($scope, tracto, Company, $state, Auth) {
    $scope.tracto = tracto;
  });
