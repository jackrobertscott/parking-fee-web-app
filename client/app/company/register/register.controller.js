'use strict';

angular.module('webApp')
  .controller('CompanyRegisterCtrl', function ($scope, $http, $state, socket, Company) {
    $scope.company = {};
    $scope.errors = [];

    $scope.register = function() {
      var company = new Company($scope.company);

      company.$save(function(res) {
        $scope.company = {};
        $state.go('company', {id: res._id});
			}, function(err) {
				$scope.errors.push(err.data);
			});
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/companies/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('company');
    });
  });
