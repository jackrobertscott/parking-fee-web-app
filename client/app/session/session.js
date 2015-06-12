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
        templateUrl: 'app/session/overview.html',
        controller: 'ManySessionsCtrl',
        controllerAs: 'vmMain'
      });
  }
})();
