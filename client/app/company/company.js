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
        templateUrl: 'app/company/company.register.html',
        controller: 'CompanyCtrl'
      })
      .state('companySettings', {
        url: '/company/settings',
        templateUrl: 'app/company/company.settings.html',
        controller: 'CompanyCtrl'
      });
  });
