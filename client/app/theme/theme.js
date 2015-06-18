(function() {
  'use strict';

  angular
    .module('webApp')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
      .state('ext', {
        abstract: true,
        templateUrl: 'app/theme/theme.external.html',
        controller: 'ThemeCtrl',
        controllerAs: 'vmApp',
        resolve: {
          currentUser: currentUser
        }
      })
      .state('app', {
        abstract: true,
        templateUrl: 'app/theme/theme.internal.html',
        controller: 'ThemeCtrl',
        controllerAs: 'vmApp',
        resolve: {
          currentUser: currentUser
        }
      });
  }

  currentUser.$inject = ['Auth'];

  function currentUser(Auth) {
    return Auth.getCurrentUser().$promise;
  }
})();
