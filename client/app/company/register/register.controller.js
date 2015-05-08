'use strict';

angular.module('webApp')
  .controller('CompanyRegisterCtrl', function ($scope, $state, Company, Auth) {
    $scope.errors = [];
    $scope.company = {};

    $scope.register = function(form) {
      $scope.submitted = true;
      // Check form is valid
      if (form.$valid) {
        $scope.errors = [];
        // Create and set details of new company
        var user = Auth.getCurrentUser();
        $scope.company._creator = user._id;
        $scope.company.admins = [user._id];
        var company = new Company($scope.company);
        // Save company
        company.$save(function(res) {
          // Update user.company
          Auth.setCompany(res)
          .then(function() {
            // Clear the form
            $scope.company = {};
            // Relocate to main page
            $state.go('company');
          })
          .catch(function(err) {
    				$scope.errors.push(err);
          });
  			}, function(err) {
  				$scope.errors.push(err);
  			});
      }
    };
  });
