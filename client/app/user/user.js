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
        controller: 'OneUserCtrl',
        controllerAs: 'vm'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'app/user/login.html',
        controller: 'OneUserCtrl',
        controllerAs: 'vm'
      })
      .state('logout', {
        url: '/logout',
        templateUrl: 'app/user/logout.html',
        controller: 'OneUserCtrl',
        controllerAs: 'vm'
      })
      .state('app.user', {
        url: '/user',
        templateUrl: 'app/user/user.html',
        controller: 'ManyUsersCtrl',
        controllerAs: 'vmContent',
      })
      .state('app.user.password', {
        url: '/password',
        templateUrl: 'app/user/password.html',
        controller: 'OneUserCtrl',
        controllerAs: 'vm',
        data: {
          role: 'user'
        }
      })
      .state('app.user.settings', {
        url: '/settings',
        templateUrl: 'app/user/settings.html',
        controller: 'OneUserCtrl',
        controllerAs: 'vm',
        data: {
          role: 'user'
        }
      });
  }
})();
