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
      templateUrl: 'app/session/views/overview.html',
      controller: 'ManySessionsCtrl',
      controllerAs: 'vm',
      data: {
        role: 'admin'
      }
    });
  }
})();
