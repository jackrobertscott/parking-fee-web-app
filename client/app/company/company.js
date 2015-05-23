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
      templateUrl: 'app/company/views/overview.html',
      controller: 'ManyCompaniesCtrl',
      controllerAs: 'vm',
      data: {
        role: 'company'
      }
    })
    .state('companyAdmin', {
      url: '/company/admin',
      templateUrl: 'app/company/views/admin.html',
      controller: 'ManyCompaniesCtrl',
      controllerAs: 'vm',
      data: {
        role: 'admin'
      }
    })
    .state('companyMembers', {
      url: '/company/members',
      templateUrl: 'app/company/views/members.html',
      controller: 'ManyCompaniesCtrl',
      controllerAs: 'vm',
      data: {
        role: 'company'
      }
    })
    .state('companyRegister', {
      url: '/company/register',
      templateUrl: 'app/company/views/register.html',
      controller: 'OneCompanyCtrl',
      controllerAs: 'vm',
      data: {
        role: 'user'
      }
    })
    .state('companySettings', {
      url: '/company/settings',
      templateUrl: 'app/company/views/settings.html',
      controller: 'OneCompanyCtrl',
      controllerAs: 'vm',
      data: {
        role: 'company'
      }
    });
  }
})();
