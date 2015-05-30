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
      templateUrl: 'components/user/overview.html',
      controller: 'ManyUsersCtrl',
      controllerAs: 'vm',
      data: {
        role: 'admin'
      }
    })
    .state('userAdmin', {
      url: '/user/admin',
      templateUrl: 'components/user/admin.html',
      controller: 'ManyUsersCtrl',
      controllerAs: 'vm',
      data: {
        role: 'admin'
      }
    })
    .state('userRegister', {
      url: '/register',
      templateUrl: 'components/user/register.html',
      controller: 'OneUserCtrl',
      controllerAs: 'vm'
    })
    .state('userLogin', {
      url: '/login',
      templateUrl: 'components/user/login.html',
      controller: 'OneUserCtrl',
      controllerAs: 'vm'
    })
    .state('userLogout', {
      url: '/logout',
      templateUrl: 'components/user/logout.html',
      controller: 'OneUserCtrl',
      controllerAs: 'vm'
    })
    .state('userPassword', {
      url: '/password',
      templateUrl: 'components/user/password.html',
      controller: 'OneUserCtrl',
      controllerAs: 'vm',
      data: {
        role: 'user'
      }
    })
    .state('userSettings', {
      url: '/settings',
      templateUrl: 'components/user/settings.html',
      controller: 'OneUserCtrl',
      controllerAs: 'vm',
      data: {
        role: 'user'
      }
    });
  }
})();
