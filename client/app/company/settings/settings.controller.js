'use strict';

angular.module('webApp')
  .controller('CompanySettingsCtrl', function ($scope, tracto, companyCurator, $state, Auth) {
    $scope.tracto = tracto;
  });
