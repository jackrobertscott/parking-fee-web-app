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
      templateUrl: 'components/vehicle/overview.html',
      controller: 'ManyVehiclesCtrl',
      controllerAs: 'vm',
      data: {
        role: 'admin'
      }
    })
    .state('vehicleUser', {
      url: '/vehicle/user',
      templateUrl: 'components/vehicle/user.html',
      controller: 'ManyVehiclesCtrl',
      controllerAs: 'vm',
      data: {
        role: 'user'
      }
    })
    .state('vehicleRegister', {
      url: '/vehicle/register',
      templateUrl: 'components/vehicle/register.html',
      controller: 'OneVehicleCtrl',
      controllerAs: 'vm',
      data: {
        role: 'user'
      }
    })
    .state('vehicleSettings', {
      url: '/vehicle/settings/:id',
      templateUrl: 'components/vehicle/settings.html',
      controller: 'OneVehicleCtrl',
      controllerAs: 'vm',
      data: {
        role: 'user'
      }
    });
  }
})();
