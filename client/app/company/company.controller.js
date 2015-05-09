'use strict';

angular.module('webApp')
  .controller('CompanyCtrl', function ($scope, $state, $stateParams, Company, Auth) {
    $scope.errors = [];
    $scope.message = '';
    $scope.company = {};

    /**
     * Set the company object to the users associated company
     */
    $scope.find = function() {
      var company = Auth.getCurrentUser().company;
      if (!company) return;
      $scope.company = Company.get({id: company._id});
    };

    $scope.register = function(form) {
      $scope.submitted = true;
      reset();

      if (form.$valid) {
        var user = Auth.getCurrentUser();
        $scope.company._creator = user._id;
        $scope.company.admins = [user._id];
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

    var reset = function () {
      $scope.errors = [];
      $scope.message = '';
    };
  });
