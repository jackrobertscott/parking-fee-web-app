(function() {
  'use strict';

  angular
    .module('webApp')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
      .state('vehicle', {
        url: '/vehicle',
        templateUrl: 'app/vehicle/vehicle.html',
        controller: 'ManyVehiclesCtrl',
        controllerAs: 'vmMain'
      })
      .state('vehicleRegister', {
        url: '/register',
        templateUrl: 'app/vehicle/register.html',
        controller: 'OneVehicleCtrl',
        controllerAs: 'vm',
        data: {
          role: 'user'
        }
      })
      .state('vehicleSettings', {
        url: '/settings/:id',
        templateUrl: 'app/vehicle/settings.html',
        controller: 'OneVehicleCtrl',
        controllerAs: 'vm',
        data: {
          role: 'user'
        }
      });
  }
})();
