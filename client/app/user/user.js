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
      templateUrl: 'app/user/views/overview.html',
      controller: 'ManyUsersCtrl',
      controllerAs: 'vm',
      data: {
        role: 'admin'
      }
    })
    .state('userAdmin', {
      url: '/user/admin',
      templateUrl: 'app/user/views/admin.html',
      controller: 'ManyUsersCtrl',
      controllerAs: 'vm',
      data: {
        role: 'admin'
      }
    })
    .state('userRegister', {
      url: '/register',
      templateUrl: 'app/user/views/register.html',
      controller: 'OneUserCtrl',
      controllerAs: 'vm'
    })
    .state('userLogin', {
      url: '/login',
      templateUrl: 'app/user/views/login.html',
      controller: 'OneUserCtrl',
      controllerAs: 'vm'
    })
    .state('userLogout', {
      url: '/logout',
      templateUrl: 'app/user/views/logout.html',
      controller: 'OneUserCtrl',
      controllerAs: 'vm'
    })
    .state('userPassword', {
      url: '/password',
      templateUrl: 'app/user/views/password.html',
      controller: 'OneUserCtrl',
      controllerAs: 'vm',
      data: {
        role: 'user'
      }
    })
    .state('userSettings', {
      url: '/settings',
      templateUrl: 'app/user/views/settings.html',
      controller: 'OneUserCtrl',
      controllerAs: 'vm',
      data: {
        role: 'user'
      }
    });
  }
})();
