(function() {
  'use strict';

  angular
    .module('webApp')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
      .state('company', {
        url: '/company',
        templateUrl: 'app/company/overview.html',
        controller: 'ManyCompaniesCtrl',
        controllerAs: 'vm',
        data: {
          role: 'company'
        }
      })
      .state('companyAdmin', {
        url: '/company/admin',
        templateUrl: 'app/company/admin.html',
        controller: 'ManyCompaniesCtrl',
        controllerAs: 'vm',
        data: {
          role: 'admin'
        }
      })
      .state('companyMembers', {
        url: '/company/members',
        templateUrl: 'app/company/members.html',
        controller: 'ManyCompaniesCtrl',
        controllerAs: 'vm',
        data: {
          role: 'company'
        }
      })
      .state('companyRegister', {
        url: '/company/register',
        templateUrl: 'app/company/register.html',
        controller: 'OneCompanyCtrl',
        controllerAs: 'vm',
        data: {
          role: 'user'
        }
      })
      .state('companySettings', {
        url: '/company/settings',
        templateUrl: 'app/company/settings.html',
        controller: 'OneCompanyCtrl',
        controllerAs: 'vm',
        data: {
          role: 'company'
        }
      });
  }
})();
