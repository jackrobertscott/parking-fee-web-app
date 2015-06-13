(function() {
  'use strict';

  angular
    .module('webApp')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
      .state('app.session', {
        url: '/session',
        templateUrl: 'app/session/session.html',
        controller: 'ManySessionsCtrl',
        controllerAs: 'vm'
      })
      .state('app.session.detail', {
        url: '/detail',
        templateUrl: 'app/session/detail.html',
        controller: 'OneSessionCtrl',
        controllerAs: 'vm'
      });
  }
})();
