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
      url: '/user/register',
      templateUrl: 'app/user/views/register.html',
      controller: 'OneUserCtrl',
      controllerAs: 'vm'
    })
    .state('userLogin', {
      url: '/user/login',
      templateUrl: 'app/user/views/login.html',
      controller: 'OneUserCtrl',
      controllerAs: 'vm'
    })
    .state('userLogout', {
      url: '/user/logout',
      templateUrl: 'app/user/views/logout.html',
      controller: 'OneUserCtrl',
      controllerAs: 'vm'
    })
    .state('userPassword', {
      url: '/user/password',
      templateUrl: 'app/user/views/password.html',
      controller: 'OneUserCtrl',
      controllerAs: 'vm',
      data: {
        role: 'user'
      }
    });
  }
})();
