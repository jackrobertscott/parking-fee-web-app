(function() {
  'use strict';

  angular
  .module('webApp')
  .config(config);

  config.$inject = ['stateProvider'];

  function config($stateProvider) {
    $stateProvider
    .state('vehicle', {
      url: '/vehicle',
      templateUrl: 'app/vehicle/views/overview.html',
      controller: 'manyVehicleCtrl',
      controllerAs: 'vm'
    })
    .state('vehicleUser', {
      url: '/vehicle/user',
      templateUrl: 'app/vehicle/views/user.html',
      controller: 'manyVehicleCtrl',
      controllerAs: 'vm'
    })
    .state('vehicleRegister', {
      url: '/vehicle/register',
      templateUrl: 'app/vehicle/views/register.html',
      controller: 'oneVehicleCtrl',
      controllerAs: 'vm'
    })
    .state('vehicleSettings', {
      url: '/vehicle/settings',
      templateUrl: 'app/vehicle/views/settings.html',
      controller: 'oneVehicleCtrl',
      controllerAs: 'vm'
    });
  }
})();
