(function() {
  'use strict';

  angular
    .module('webApp')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
      .state('register', {
        url: '/register',
        templateUrl: 'app/user/register.html',
        controller: 'UserCtrl',
        controllerAs: 'vm'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'app/user/login.html',
        controller: 'UserCtrl',
        controllerAs: 'vm'
      })
      .state('logout', {
        url: '/logout',
        templateUrl: 'app/user/logout.html',
        controller: 'UserCtrl',
        controllerAs: 'vm'
      })
      .state('app.user', {
        url: '/user',
        templateUrl: 'app/user/user.html',
        controller: 'UserCtrl',
        controllerAs: 'vm',
      })
      .state('app.user.password', {
        url: '/password',
        templateUrl: 'app/user/user.password.html',
        data: {
          role: 'user'
        }
      })
      .state('app.user.settings', {
        url: '/settings',
        templateUrl: 'app/user/user.settings.html',
        data: {
          role: 'user'
        }
      });
  }
})();
