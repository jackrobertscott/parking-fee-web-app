'use strict';

angular.module('webApp')
  .controller('CompanyRegisterCtrl', function ($scope, tracto, Company, $state, Auth) {
    $scope.tracto = tracto;
    $scope.company = {};

    $scope.register = function(form) {
      $scope.submitted = true;
      $scope.tracto.reset();

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
            .catch($scope.tracto.handle);
          }, $scope.tracto.handle);
  			}, $scope.tracto.handle);
      }
    };
  });
