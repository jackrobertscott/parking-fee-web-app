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
        controller: 'LocationCtrl',
        controllerAs: 'vm'
      })
      .state('app.location.register', {
        url: '/register',
        templateUrl: 'app/location/location.register.html',
        data: {
          role: 'company'
        }
      })
      .state('app.location.settings', {
        url: '/settings/:id',
        templateUrl: 'app/location/location.settings.html',
        data: {
          role: 'company'
        }
      });
  }
})();
