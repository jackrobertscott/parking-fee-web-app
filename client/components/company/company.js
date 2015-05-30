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
      templateUrl: 'components/company/overview.html',
      controller: 'ManyCompaniesCtrl',
      controllerAs: 'vm',
      data: {
        role: 'company'
      }
    })
    .state('companyAdmin', {
      url: '/company/admin',
      templateUrl: 'components/company/admin.html',
      controller: 'ManyCompaniesCtrl',
      controllerAs: 'vm',
      data: {
        role: 'admin'
      }
    })
    .state('companyMembers', {
      url: '/company/members',
      templateUrl: 'components/company/members.html',
      controller: 'ManyCompaniesCtrl',
      controllerAs: 'vm',
      data: {
        role: 'company'
      }
    })
    .state('companyRegister', {
      url: '/company/register',
      templateUrl: 'components/company/register.html',
      controller: 'OneCompanyCtrl',
      controllerAs: 'vm',
      data: {
        role: 'user'
      }
    })
    .state('companySettings', {
      url: '/company/settings',
      templateUrl: 'components/company/settings.html',
      controller: 'OneCompanyCtrl',
      controllerAs: 'vm',
      data: {
        role: 'company'
      }
    });
  }
})();
