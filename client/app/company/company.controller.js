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
      var companyId = Auth.getCurrentUser().company;

      if ($state.is('companyRegister')) {
        if (companyId) {
          $state.go('companySettings');
        }
      } else {
        if (companyId) {
          Company.get({ id: companyId },
          function(company) {
            $scope.company = company;
          }, errorHandler);
        } else {
          $state.go('companyRegister');
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
        angular.merge($scope.company, {
          _creator: user._id,
          admins: [user._id]
        });
        var company = new Company($scope.company);
        company.$save(function(company) {
          Auth.setCompany(company)
          .then(function() {
            Auth.promote('company')
            .then(function() {
              $scope.company = {};
              $state.go('company');
            })
            .catch(errorHandler);
          })
          .catch(errorHandler);
  			}, errorHandler);
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
  			}, errorHandler);
      }
    };

    /**
     * Deactivate a company
     * TODO: move company to archive database
     */
    $scope.remove = function(form) {
      var company = $scope.company;
      $scope.submitted = true;
      reset();

      if (form.$valid && company) {
        Auth.removeCompany(company)
        .then(function() {
          company.$remove(function() {
            $scope.company = {};
            $state.go('main');
          }, errorHandler);
        })
        .catch(errorHandler);
      }
    };

    /**
     * Reset a errors and message in form
     */
    var reset = function () {
      $scope.errors = [];
      $scope.message = '';
    };

    /**
     * A error handling function
     */
    var errorHandler = function (err) {
      $scope.errors.push(err.data);
    };
  });
