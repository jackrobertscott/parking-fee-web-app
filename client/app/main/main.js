(function() {
  'use strict';

  angular
    .module('webApp')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
      .state('barred.about', {
        url: '/about',
        templateUrl: 'app/main/about.html',
        controller: 'MainCtrl',
        controllerAs: 'vm'
      })
      .state('barred.faq', {
        url: '/faq',
        templateUrl: 'app/main/faq.html',
        controller: 'MainCtrl',
        controllerAs: 'vm'
      })
      .state('barred.terms', {
        url: '/terms',
        templateUrl: 'app/main/terms.html',
        controller: 'MainCtrl',
        controllerAs: 'vm'
      })
      .state('barred.contact', {
        url: '/contact',
        templateUrl: 'app/main/contact.html',
        controller: 'MainCtrl',
        controllerAs: 'vm'
      });
  }
})();
