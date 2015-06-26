(function() {
  'use strict';

  angular
    .module('webApp')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
      .state('dashboard.independent', {
        url: '/independent',
        templateUrl: 'app/independent/independent.html',
        controller: 'ManyLocationsCtrl',
        controllerAs: 'vmMany'
      })
      .state('splash.independent', { // not a subview of many independent state
        url: '/independent/register',
        templateUrl: 'app/independent/register.html',
        controller: 'OneIndependentCtrl',
        controllerAs: 'vmOne',
        data: {
          role: 'user'
        }
      });
  }
})();
