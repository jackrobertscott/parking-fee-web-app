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
      templateUrl: 'app/location/overview.html',
      controller: 'ManyLocationsCtrl',
      controllerAs: 'vm',
      data: {
        role: 'user'
      }
    })
    .state('locationCompany', {
      url: '/location/company',
      templateUrl: 'app/location/company.html',
      controller: 'ManyLocationsCtrl',
      controllerAs: 'vm',
      data: {
        role: 'company'
      }
    })
    .state('locationRegister', {
      url: '/location/register',
      templateUrl: 'app/location/register.html',
      controller: 'OneLocationCtrl',
      controllerAs: 'vm',
      data: {
        role: 'company'
      }
    })
    .state('locationSettings', {
      url: '/location/settings/:id',
      templateUrl: 'app/location/settings.html',
      controller: 'OneLocationCtrl',
      controllerAs: 'vm',
      data: {
        role: 'company'
      }
    });
  }
})();
