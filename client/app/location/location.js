'use strict';

angular.module('webApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('location', {
        url: '/location',
        templateUrl: 'app/location/location.html',
        controller: 'LocationCtrl'
      });
  });