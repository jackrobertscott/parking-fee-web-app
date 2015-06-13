(function() {
  'use strict';

  angular
    .module('webApp')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
      .state('app.vehicle', {
        url: '/vehicle',
        templateUrl: 'app/vehicle/vehicle.html',
        controller: 'ManyVehiclesCtrl',
        controllerAs: 'vm'
      })
      .state('app.vehicle.register', {
        url: '/register',
        templateUrl: 'app/vehicle/register.html',
        controller: 'OneVehicleCtrl',
        controllerAs: 'vm',
        data: {
          role: 'user'
        }
      })
      .state('app.vehicle.settings', {
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
