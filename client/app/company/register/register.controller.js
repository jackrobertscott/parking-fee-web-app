'use strict';

angular.module('webApp')
  .controller('CompanyRegisterCtrl', function ($scope, $http, socket) {
    $scope.company = {};
    $scope.errors = {};

    $scope.register = function() {
      $http.post('/api/companies', { company: $scope.company })
        .success(function (data) {

        }).error(function (err) {

        });
      $scope.company = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/companies/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('company');
    });
  });
