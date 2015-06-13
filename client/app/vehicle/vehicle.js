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
        controller: 'VehicleCtrl',
        controllerAs: 'vm',
        data: {
          role: 'user'
        }
      })
      .state('app.vehicle.register', {
        url: '/register',
        templateUrl: 'app/vehicle/vehicle.register.html',
        data: {
          role: 'user'
        }
      })
      .state('app.vehicle.settings', {
        url: '/settings/:id',
        templateUrl: 'app/vehicle/vehicle.settings.html',
        data: {
          role: 'user'
        }
      });
  }
})();
