(function() {
  'use strict';

  angular
    .module('webApp')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
      .state('splash', {
        abstract: true,
        templateUrl: 'app/theme/theme-splash.html',
        controller: 'ThemeSplashCtrl',
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
