'use strict';

angular.module('webApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('vehicle', {
        url: '/vehicle',
        templateUrl: 'app/vehicle/overview/overview.html',
        controller: 'VehicleOverviewCtrl'
      })
      .state('vehicleRegister', {
        url: '/vehicle/register',
        templateUrl: 'app/vehicle/register/register.html',
        controller: 'VehicleRegisterCtrl'
      })
      .state('vehicleUser', {
        url: '/vehicle/user',
        templateUrl: 'app/vehicle/user/user.html',
        controller: 'VehicleUserCtrl'
      })
      .state('vehicleSettings', {
        url: '/vehicle/settings/:id',
        templateUrl: 'app/vehicle/settings/settings.html',
        controller: 'VehicleSettingsCtrl'
      });
  });
