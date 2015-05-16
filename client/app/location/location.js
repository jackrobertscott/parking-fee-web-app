'use strict';

angular.module('webApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('location', {
        url: '/location',
        templateUrl: 'app/location/overview/overview.html',
        controller: 'LocationCtrl'
      })
      .state('locationRegister', {
        url: '/location/register',
        templateUrl: 'app/location/register/register.html',
        controller: 'LocationCtrl'
      })
      .state('locationSettings', {
        url: '/location/settings/:id',
        templateUrl: 'app/location/settings/settings.html',
        controller: 'LocationCtrl'
      })
      .state('locationCompany', {
        url: '/location/company',
        templateUrl: 'app/location/company/company.html',
        controller: 'LocationCtrl'
      });
  });
