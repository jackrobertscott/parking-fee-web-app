(function() {
  'use strict';

  angular
    .module('webApp')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
      .state('user', {
        url: '/user',
        templateUrl: 'app/user/overview.html',
        controller: 'ManyUsersCtrl',
        controllerAs: 'vm',
        data: {
          role: 'admin'
        }
      })
      .state('userAdmin', {
        url: '/user/admin',
        templateUrl: 'app/user/admin.html',
        controller: 'ManyUsersCtrl',
        controllerAs: 'vm',
        data: {
          role: 'admin'
        }
      })
      .state('userRegister', {
        url: '/register',
        templateUrl: 'app/user/register.html',
        controller: 'OneUserCtrl',
        controllerAs: 'vm'
      })
      .state('userLogin', {
        url: '/login',
        templateUrl: 'app/user/login.html',
        controller: 'OneUserCtrl',
        controllerAs: 'vm'
      })
      .state('userLogout', {
        url: '/logout',
        templateUrl: 'app/user/logout.html',
        controller: 'OneUserCtrl',
        controllerAs: 'vm'
      })
      .state('userPassword', {
        url: '/password',
        templateUrl: 'app/user/password.html',
        controller: 'OneUserCtrl',
        controllerAs: 'vm',
        data: {
          role: 'user'
        }
      })
      .state('userSettings', {
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