'use strict';

angular.module('webApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('company', {
        url: '/company',
        templateUrl: 'app/company/overview/overview.html',
        controller: 'CompanyCtrl'
      })
      .state('companyRegister', {
        url: '/company/register',
        templateUrl: 'app/company/register/register.html',
        controller: 'CompanyCtrl'
      })
      .state('companySettings', {
        url: '/company/settings',
        templateUrl: 'app/company/settings/settings.html',
        controller: 'CompanyCtrl'
      });
  });
