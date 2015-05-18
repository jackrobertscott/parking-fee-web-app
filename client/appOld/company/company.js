'use strict';

angular.module('webApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('company', {
        url: '/company',
        templateUrl: 'app/company/overview/overview.html',
        controller: 'CompanyOverviewCtrl'
      })
      .state('companyRegister', {
        url: '/company/register',
        templateUrl: 'app/company/register/register.html',
        controller: 'CompanyRegisterCtrl'
      })
      .state('companySettings', {
        url: '/company/settings',
        templateUrl: 'app/company/settings/settings.html',
        controller: 'CompanySettingsCtrl'
      })
      .state('companyAdmin', {
        url: '/company/admin',
        templateUrl: 'app/company/admin/admin.html',
        controller: 'CompanyAdminCtrl'
      });
  });
