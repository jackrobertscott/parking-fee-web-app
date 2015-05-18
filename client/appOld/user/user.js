'use strict';

angular.module('webApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('user', {
        url: '/user',
        templateUrl: 'app/user/overview/overview.html',
        controller: 'UserOverviewCtrl'
      })
      .state('userRegister', {
        url: '/register',
        templateUrl: 'app/user/register/register.html',
        controller: 'UserRegisterCtrl'
      })
      .state('userSettings', {
        url: '/settings',
        templateUrl: 'app/user/settings/settings.html',
        controller: 'UserSettingsCtrl'
      })
      .state('userLogin', {
        url: '/login',
        templateUrl: 'app/user/login/login.html',
        controller: 'UserLoginCtrl'
      })
      .state('userLogout', {
        url: '/logout',
        templateUrl: 'app/user/logout/logout.html',
        controller: 'UserLogoutCtrl'
      })
      .state('userAdmin', {
        url: '/admin',
        templateUrl: 'app/user/admin/admin.html',
        controller: 'UserAdminCtrl'
      });
  });
