(function() {
  'use strict';

  angular
  .module('webApp')
  .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
    .state('session', {
      url: '/session',
      templateUrl: 'components/session/overview.html',
      controller: 'ManySessionsCtrl',
      controllerAs: 'vm',
      data: {
        role: 'admin'
      }
    })
    .state('sessionUser', {
      url: '/session/user',
      templateUrl: 'components/session/user.html',
      controller: 'ManySessionsCtrl',
      controllerAs: 'vm',
      data: {
        role: 'user'
      }
    });
  }
})();
