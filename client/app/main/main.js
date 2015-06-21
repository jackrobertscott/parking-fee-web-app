(function() {
  'use strict';

  angular
    .module('webApp')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
      .state('ext.main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        controllerAs: 'vm'
      })
      .state('ext.about', {
        url: '/about',
        templateUrl: 'app/main/about.html',
        controller: 'MainCtrl',
        controllerAs: 'vm'
      })
      .state('ext.faq', {
        url: '/faq',
        templateUrl: 'app/main/faq.html',
        controller: 'MainCtrl',
        controllerAs: 'vm'
      })
      .state('ext.terms', {
        url: '/terms',
        templateUrl: 'app/main/terms.html',
        controller: 'MainCtrl',
        controllerAs: 'vm'
      });
  }
})();
