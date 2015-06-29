(function() {
  'use strict';

  angular
    .module('webApp')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
      .state('splash', {
        url: '/',
        templateUrl: 'app/theme/theme-splash.html',
        controller: 'ThemeDefaultCtrl',
        controllerAs: 'vmApp',
        resolve: {
          currentUser: currentUser
        }
      })
      .state('barred', {
        abstract: true,
        templateUrl: 'app/theme/theme-barred.html',
        controller: 'ThemeDefaultCtrl',
        controllerAs: 'vmApp',
        resolve: {
          currentUser: currentUser
        }
      })
      .state('dashboard', {
        abstract: true,
        templateUrl: 'app/theme/theme-dashboard.html',
        controller: 'ThemeDashboardCtrl',
        controllerAs: 'vmApp',
        data: {
          role: 'user'
        },
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
