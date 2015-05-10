'use strict';

angular.module('webApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('vehicle', {
        url: '/vehicle',
        templateUrl: 'app/vehicle/vehicle.html',
        controller: 'VehicleCtrl'
      })
      .state('vehicleRegister', {
        url: '/vehicle/register',
        templateUrl: 'app/vehicle/vehicle.register.html',
        controller: 'VehicleCtrl'
      })
      .state('vehicleSettings', {
        url: '/vehicle/settings',
        templateUrl: 'app/vehicle/vehicle.settings.html',
        controller: 'VehicleCtrl'
      });
  });
