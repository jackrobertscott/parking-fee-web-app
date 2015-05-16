'use strict';

angular.module('webApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('user', {
        url: '/user',
        templateUrl: 'app/user/overview/overview.html',
        controller: 'UserCtrl'
      })
      .state('userRegister', {
        url: '/register',
        templateUrl: 'app/user/register/register.html',
        controller: 'UserCtrl'
      })
      .state('userSettings', {
        url: '/settings',
        templateUrl: 'app/user/settings/settings.html',
        controller: 'UserCtrl'
      })
      .state('userLogin', {
        url: '/login',
        templateUrl: 'app/user/login/login.html',
        controller: 'UserCtrl'
      })
      .state('userLogout', {
        url: '/logout',
        templateUrl: 'app/user/logout/logout.html',
        controller: 'UserCtrl'
      })
      .state('userAdmin', {
        url: '/admin',
        templateUrl: 'app/user/admin/admin.html',
        controller: 'UserCtrl'
      });
  });
