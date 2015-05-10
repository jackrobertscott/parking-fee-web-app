'use strict';

angular.module('webApp')
  .controller('CompanyCtrl', function ($scope, $state, Company, Auth) {
    $scope.errors = [];
    $scope.message = '';
    $scope.company = {};

    /**
     * Set the company object to the users associated company
     * If the company is empty then redirect to registry
     * If on register view but company exists; redirect to settings
     */
    $scope.find = function() {
      var company = Auth.getCurrentUser().company;

      if ($state.is('companyRegister')) {
        if (company) {
          $state.go('companySettings');
        }
      } else {
        if (!company) {
          $state.go('companyRegister');
        } else {
          $scope.company = Company.get({id: company._id});
        }
      }
    };
    $scope.find();

    /**
     * Register a company
     * Update users company object and user role
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
            Auth.promote('company')
            .then(function() {
              $scope.company = {};
              $state.go('company');
            })
            .catch(function(err) {
      				$scope.errors.push(err.data);
            });
          })
          .catch(function(err) {
    				$scope.errors.push(err.data);
          });
  			}, function(err) {
  				$scope.errors.push(err.data);
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
        $scope.company.$update(function() {
          $scope.message = 'Details successfully updated';
  			}, function(err) {
  				$scope.errors.push(err.data);
  			});
      }
    };

    /**
     * Deactivate a company
     * TODO: move company to archive database
     */
    $scope.remove = function(form) {
      $scope.submitted = true;
      reset();

      if (form.$valid && $scope.company) {
        $scope.company.$remove(function() {
          $scope.company = {};
          $scope.message = 'Company deactivated';
        }, function(err) {
          $scope.errors.push(err);
        });
      }
    };

    /**
     * Reset a errors and message in form
     */
    var reset = function () {
      $scope.errors = [];
      $scope.message = '';
    };
  });
