'use strict';

angular.module('webApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('vehicle', {
        url: '/vehicle',
        templateUrl: 'app/vehicle/overview/overview.html',
        controller: 'VehicleCtrl'
      })
      .state('vehicleRegister', {
        url: '/vehicle/register',
        templateUrl: 'app/vehicle/register/register.html',
        controller: 'VehicleCtrl'
      })
      .state('vehicleSettings', {
        url: '/vehicle/settings/:id',
        templateUrl: 'app/vehicle/settings/settings.html',
        controller: 'VehicleCtrl'
      });
  });
