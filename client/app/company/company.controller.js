'use strict';

angular.module('webApp')
  .controller('CompanyCtrl', function ($scope, $state, Company, Auth) {
    $scope.response = {};
    $scope.company = {};
    $scope.companies = [];

    // TODO: Need to change this
    // If user is redirected, cannot click back!
    if ($state.is('companyRegister')) {
      if (Auth.getCurrentUser().company) {
        $state.go('companySettings');
      }
    }

    /**
     * Find all companies
     */
    $scope.find = function() {
      Company.query(function(companies) {
        $scope.companies = companies;
      }, errorHandler);
    };

    /**
     * Find the users company
     */
    $scope.findOne = function() {
      Company.get({ id: Auth.getCurrentUser().company },
      function(company) {
        if (!company) { $state.go('main'); }
        $scope.company = company;
      }, errorHandler);
    };

    /**
     * Register new company
     * Update user with new company
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
        company.$save(function(company) {
          user.company = company._id;
          user.$update(function() {
            Auth.promote('company')
            .then(function() {
              $state.go('company');
            })
            .catch(errorHandler);
          }, errorHandler);
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
          $scope.response.good = 'Details successfully updated';
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
        company.$remove(function() {
          $state.go('main');
        }, errorHandler);
      }
    };

    /**
     * Reset response object
     */
    var reset = function () {
      $scope.response = {};
    };

    /**
     * A error handling function
     */
    var errorHandler = function (err) {
      console.log(err.data);
      $scope.response.bad = 'An error has occurred, we apologise for this inconvenience';
    };
  });
