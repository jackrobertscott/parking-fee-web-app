(function() {
  'use strict';

  angular
    .module('webApp')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
      .state('dashboard.session', {
        url: '/session',
        templateUrl: 'app/session/session.html',
        controller: 'ManySessionsCtrl',
        controllerAs: 'vmMany',
        data: {
          role: 'user'
        }
      })
      .state('dashboard.session.detail', {
        url: '/detail/:id',
        templateUrl: 'app/session/session.detail.html'
      });
  }
})();
