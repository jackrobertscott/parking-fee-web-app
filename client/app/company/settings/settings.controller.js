'use strict';

angular.module('webApp')
  .controller('CompanySettingsCtrl', function ($scope, tracto, Company, $state, Auth) {
    $scope.tracto = tracto;
    $scope.company = {};

    $scope.findOne = function() {
      var companyId = Auth.getCurrentUser().company;
      if (companyId) {
        Company.get({ id: companyId },
        function(company) {
          if (!company) { $state.go('main'); }
          $scope.company = company;
        }, $scope.tracto.handle);
      } else {
        $state.go('companyRegister');
      }
    };

    $scope.update = function(form) {
      $scope.submitted = true;
      $scope.tracto.reset();

      if (form.$valid) {
        $scope.company.$update(function() {
          $scope.tracto.good = 'Details successfully updated';
  			}, $scope.tracto.handle);
      }
    };

    $scope.remove = function(form) {
      var company = $scope.company;
      $scope.submitted = true;
      $scope.tracto.reset();

      if (form.$valid && company) {
        company.$remove(function() {
          $state.go('main');
        }, $scope.tracto.handle);
      }
    };
  });
