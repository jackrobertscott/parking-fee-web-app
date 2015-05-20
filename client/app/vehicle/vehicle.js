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
      templateUrl: 'app/vehicle/views/overview.html',
      controller: 'ManyVehiclesCtrl',
      controllerAs: 'vm',
      data: {
        role: 'admin'
      }
    })
    .state('vehicleUser', {
      url: '/vehicle/user',
      templateUrl: 'app/vehicle/views/user.html',
      controller: 'ManyVehiclesCtrl',
      controllerAs: 'vm',
      data: {
        role: 'user'
      }
    })
    .state('vehicleRegister', {
      url: '/vehicle/register',
      templateUrl: 'app/vehicle/views/register.html',
      controller: 'OneVehicleCtrl',
      controllerAs: 'vm',
      data: {
        role: 'user'
      }
    })
    .state('vehicleSettings', {
      url: '/vehicle/settings/:id',
      templateUrl: 'app/vehicle/views/settings.html',
      controller: 'OneVehicleCtrl',
      controllerAs: 'vm',
      data: {
        role: 'user'
      }
    });
  }
})();
