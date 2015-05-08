'use strict';

angular.module('webApp')
  .controller('CompanyRegisterCtrl', function ($scope, $state, Company, User) {
    $scope.errors = [];
    $scope.company = {};

    $scope.register = function(form) {
      // Check form is valid
      if (form.$valid) {
        $scope.errors = [];
        // Create and set details of new company
        var company = new Company($scope.company);
        var user = User.get();
        company._creator = user;
        company.admins.push(user);
        // Save company
        company.$save(function(res) {
          // Update user.company
          user.company = res;
          user.$update(function() {
            // Clear the form
            $scope.company = {};
            // Relocate to main page
            $state.go('company');
          }, function(err) {
    				$scope.errors.push(err.data.toString());
    			});
  			}, function(err) {
  				$scope.errors.push(err.data.toString());
  			});
      }
    };
  });
