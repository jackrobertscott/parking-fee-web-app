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
        controllerAs: 'vmMany'
      })
      .state('app.location.register', {
        url: '/register',
        templateUrl: 'app/location/location.register.html',
        controller: 'OneLocationCtrl',
        controllerAs: 'vmOne',
        data: {
          role: 'company'
        }
      })
      .state('app.location.settings', {
        url: '/settings/:id',
        templateUrl: 'app/location/location.settings.html',
        controller: 'OneLocationCtrl',
        controllerAs: 'vmOne',
        data: {
          role: 'company'
        }
      });
  }
})();
