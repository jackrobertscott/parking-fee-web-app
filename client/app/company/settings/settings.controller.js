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
        }, errorHandler);
      } else {
        $state.go('companyRegister');
      }
    };
  });
