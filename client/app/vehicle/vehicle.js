'use strict';

angular.module('webApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('vehicle', {
        url: '/vehicle',
        templateUrl: 'app/vehicle/vehicle.html',
        controller: 'VehicleCtrl'
      });
  });