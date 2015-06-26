(function() {
  'use strict';

  angular
    .module('webApp')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
      .state('splash.main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        controllerAs: 'vm'
      })
      .state('splash.about', {
        url: '/about',
        templateUrl: 'app/main/about.html',
        controller: 'MainCtrl',
        controllerAs: 'vm'
      })
      .state('splash.faq', {
        url: '/faq',
        templateUrl: 'app/main/faq.html',
        controller: 'MainCtrl',
        controllerAs: 'vm'
      })
      .state('splash.terms', {
        url: '/terms',
        templateUrl: 'app/main/terms.html',
        controller: 'MainCtrl',
        controllerAs: 'vm'
      });
  }
})();
