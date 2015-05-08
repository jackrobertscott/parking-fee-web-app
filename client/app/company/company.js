'use strict';

angular.module('webApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('company', {
        url: '/company',
        templateUrl: 'app/company/company.html',
        controller: 'CompanyCtrl'
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
      });
  });
