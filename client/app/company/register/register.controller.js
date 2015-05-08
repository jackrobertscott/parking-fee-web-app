'use strict';

angular.module('webApp')
  .controller('CompanyRegisterCtrl', function ($scope, $http, $state, socket, Company) {
    $scope.company = {};
    $scope.errors = [];

    $scope.register = function(form) {
      $scope.submitted = true;
      if (form.$valid) {
        var company = new Company($scope.company);
        company.$save(function(res) {
          $scope.company = {};
          $state.go('company', {id: res._id});
  			}, function(err) {
  				$scope.errors.push(err.data.toString());
  			});
      }
    };
  });
