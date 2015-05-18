(function() {
  'use strict';

  angular
  .module('webApp')
  .config(config);

  config.$inject = ['stateProvider'];

  function config($stateProvider) {
    $stateProvider
    .state('company', {
      url: '/company',
      templateUrl: 'app/company/views/overview.html',
      controller: 'manyCompanyCtrl',
      controllerAs: 'vm'
    })
    .state('companyAdmin', {
      url: '/company/admin',
      templateUrl: 'app/company/views/admin.html',
      controller: 'manyCompanyCtrl',
      controllerAs: 'vm'
    })
    .state('companyRegister', {
      url: '/company/register',
      templateUrl: 'app/company/views/register.html',
      controller: 'oneCompanyCtrl',
      controllerAs: 'vm'
    })
    .state('companySettings', {
      url: '/company/settings',
      templateUrl: 'app/company/views/settings.html',
      controller: 'oneCompanyCtrl',
      controllerAs: 'vm'
    });
  }
})();
