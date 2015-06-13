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
        controller: 'SessionCtrl',
        controllerAs: 'vm'
      })
      .state('app.session.detail', {
        url: '/detail',
        templateUrl: 'app/session/detail.html',
      });
  }
})();
