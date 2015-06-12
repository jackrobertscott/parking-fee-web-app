(function() {
  'use strict';

  angular
    .module('webApp')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
      .state('location', {
        url: '/location',
        templateUrl: 'app/location/location.html',
        controller: 'ManyLocationsCtrl',
        controllerAs: 'vmMain'
      })
      .state('locationRegister', {
        url: '/register',
        templateUrl: 'app/location/register.html',
        controller: 'OneLocationCtrl',
        controllerAs: 'vm',
        data: {
          role: 'company'
        }
      })
      .state('locationSettings', {
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
