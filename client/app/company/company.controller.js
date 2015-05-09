'use strict';

angular.module('webApp')
  .controller('CompanyCtrl', function ($scope, $state, $stateParams, Company, Auth) {
    $scope.errors = [];
    $scope.message = '';
    $scope.company = {};

    /**
     * Set the company object to the users associated company
     * If the company value is empty then direct to registry
     */
    $scope.find = function() {
      var company = Auth.getCurrentUser().company;
      if (!company) {
        $state.go('companyRegister');
      } else {
        $scope.company = Company.get({id: company._id});
      }
    };

    /**
     * Register a company
     */
    $scope.register = function(form) {
      $scope.submitted = true;
      reset();

      if (form.$valid) {
        var user = Auth.getCurrentUser();
        angular.extend($scope.company, {
          _creator: user._id,
          admins: [user._id]
        });
        var company = new Company($scope.company);

        company.$save(function(res) {
          Auth.setCompany(res)
          .then(function() {
            $scope.company = {};
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

    /**
     * Update a company
     */
    $scope.update = function(form) {
      $scope.submitted = true;
      reset();

      if (form.$valid) {
        var company = $scope.company;
        company.$update(function() {
          $scope.message = 'Details successfully updated';
  			}, function(err) {
  				$scope.errors.push(err);
  			});
      }
    };

    /**
     * Deactivate a company
     */
    $scope.deactivate = function() {
      $scope.submitted = true;
      reset();

      var company = $scope.company;
      company.active = false;
      company.$update(function() {
        $scope.message = 'Company deactivated';
      }, function(err) {
        $scope.errors.push(err);
      });
    };

    /**
     * Reset a errors and message in form
     */
    var reset = function () {
      $scope.errors = [];
      $scope.message = '';
    };
  });
