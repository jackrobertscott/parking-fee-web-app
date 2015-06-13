(function() {
  'use strict';

  angular
    .module('webApp')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
      .state('app.location', {
        url: '/location',
        templateUrl: 'app/location/location.html',
        controller: 'ManyLocationsCtrl',
        controllerAs: 'vm'
      })
      .state('app.location.register', {
        url: '/register',
        templateUrl: 'app/location/register.html',
        controller: 'OneLocationCtrl',
        controllerAs: 'vm',
        data: {
          role: 'company'
        }
      })
      .state('app.location.settings', {
        url: '/settings/:id',
        templateUrl: 'app/location/settings.html',
        controller: 'OneLocationCtrl',
        controllerAs: 'vm',
        data: {
          role: 'company'
        }
      });
  }
})();
