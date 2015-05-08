'use strict';

angular.module('webApp')
  .controller('CompanySettingsCtrl', function ($scope, $state, $stateParams, Company) {
    $scope.errors = [];
    $scope.message = '';
    $scope.company = Company.get({id: $stateParams.id});

    $scope.update = function(form) {
      // Check form is valid
      if (form.$valid) {
        $scope.errors = [];
        // Update the company
        var company = $scope.company;
        company.$update(function() {
          $scope.errors = [];
          $scope.message = 'Details successfully updated';
  			}, function(err) {
  				$scope.errors.push(err.data.toString());
          $scope.message = '';
  			});
      }
    };
  });
