'use strict';

angular.module('webApp')
  .controller('LocationRegisterCtrl', function ($scope, tracto, Location, Company, $state, Auth) {
    $scope.tracto = tracto;
    $scope.location = {};

    $scope.register = function(form) {
      $scope.submitted = true;
      $scope.tracto.reset();

      if (form.$valid) {
        var user = Auth.getCurrentUser();
        angular.extend($scope.location, {
          _creator: user._id,
          company: user.company
        });
        var location = new Location($scope.location);
        location.$save(function() {
          Company.get({ id: user.company },
          function(company) {
            company.locations.push(location._id);
            company.$update(function() {
              $state.go('location');
            }, $scope.tracto.handle);
          }, $scope.tracto.handle);
        }, $scope.tracto.handle);
      }
    };
  });
