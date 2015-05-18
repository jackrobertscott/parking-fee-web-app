(function() {
  'use strict';

  angular
  .module('webApp')
  .config(config);

  config.$inject = ['stateProvider'];

  function config($stateProvider) {
    $stateProvider
    .state('user', {
      url: '/user',
      templateUrl: 'app/user/views/overview.html',
      controller: 'manyUserCtrl',
      controllerAs: 'vm'
    })
    .state('userAdmin', {
      url: '/user/admin',
      templateUrl: 'app/user/views/admin.html',
      controller: 'manyUserCtrl',
      controllerAs: 'vm'
    })
    .state('userRegister', {
      url: '/user/register',
      templateUrl: 'app/user/views/register.html',
      controller: 'oneUserCtrl',
      controllerAs: 'vm'
    })
    .state('userSettings', {
      url: '/user/settings',
      templateUrl: 'app/user/views/settings.html',
      controller: 'oneUserCtrl',
      controllerAs: 'vm'
    })
    .state('userLogin', {
      url: '/user/login',
      templateUrl: 'app/user/views/login.html',
      controller: 'oneUserCtrl',
      controllerAs: 'vm'
    })
    .state('userLogout', {
      url: '/user/logout',
      templateUrl: 'app/user/views/logout.html',
      controller: 'oneUserCtrl',
      controllerAs: 'vm'
    });
  }
})();
