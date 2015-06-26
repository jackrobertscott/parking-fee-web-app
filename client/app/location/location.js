(function() {
  'use strict';

  angular
    .module('webApp')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
      .state('dashboard.location', {
        url: '/location',
        templateUrl: 'app/location/location.html',
        controller: 'ManyLocationsCtrl',
        controllerAs: 'vmMany'
      })
      .state('dashboard.location.register', {
        url: '/register',
        templateUrl: 'app/location/location.register.html',
        controller: 'OneLocationCtrl',
        controllerAs: 'vmOne',
        data: {
          role: 'company'
        }
      })
      .state('dashboard.location.settings', {
        url: '/settings/:id',
        templateUrl: 'app/location/location.settings.html',
        controller: 'OneLocationCtrl',
        controllerAs: 'vmOne',
        data: {
          role: 'company'
        }
      })
      .state('dashboard.location.detail', {
        url: '/detail/:id',
        templateUrl: 'app/location/location.detail.html',
        controller: 'OneLocationCtrl',
        controllerAs: 'vmOne',
        data: {
          role: 'company'
        }
      });
  }
})();
