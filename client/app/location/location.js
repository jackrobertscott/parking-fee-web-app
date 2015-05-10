'use strict';

angular.module('webApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('location', {
        url: '/location',
        templateUrl: 'app/location/location.html',
        controller: 'LocationCtrl'
      })
      .state('locationRegister', {
        url: '/location/register',
        templateUrl: 'app/location/location.register.html',
        controller: 'LocationCtrl'
      })
      .state('locationSettings', {
        url: '/location/settings/:id',
        templateUrl: 'app/location/location.settings.html',
        controller: 'LocationCtrl'
      });
  });
