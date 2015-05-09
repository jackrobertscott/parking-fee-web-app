'use strict';

angular.module('webApp')
  .controller('CompanySettingsCtrl', function ($scope, $state, $stateParams, Company, Auth) {
    $scope.errors = [];
    $scope.message = '';
    var companyId = Auth.getCurrentUser().company._id;
    $scope.company = Company.get({id: companyId});

    $scope.update = function(form) {
      // Check form is valid
      if (form.$valid) {
        $scope.errors = [];
        $scope.message = '';
        // Update the company
        var company = $scope.company;
        company.$update(function() {
          $scope.message = 'Details successfully updated';
  			}, function(err) {
  				$scope.errors.push(err);
  			});
      }
    };
  });
