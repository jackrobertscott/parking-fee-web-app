'use strict';

angular.module('webApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('user', {
        url: '/user',
        templateUrl: 'app/user/user.html',
        controller: 'UserCtrl'
      })
      .state('userRegister', {
        url: '/register',
        templateUrl: 'app/user/user.register.html',
        controller: 'UserCtrl'
      })
      .state('userSettings', {
        url: '/settings',
        templateUrl: 'app/user/user.settings.html',
        controller: 'UserCtrl'
      })
      .state('userLogin', {
        url: '/login',
        templateUrl: 'app/user/user.login.html',
        controller: 'UserCtrl'
      })
      .state('userLogout', {
        url: '/logout',
        templateUrl: 'app/user/user.logout.html',
        controller: 'UserCtrl'
      })
      .state('userAdmin', {
        url: '/admin',
        templateUrl: 'app/user/user.admin.html',
        controller: 'UserCtrl'
      });
  });
