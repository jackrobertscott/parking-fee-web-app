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
        templateUrl: 'app/company/company.html',
        controller: 'ManyCompaniesCtrl',
        controllerAs: 'vmMain'
      })
      .state('app.company.register', {
        url: '/register',
        templateUrl: 'app/company/register.html',
        controller: 'OneCompanyCtrl',
        controllerAs: 'vm',
        data: {
          role: 'user'
        }
      })
      .state('app.company.settings', {
        url: '/settings',
        templateUrl: 'app/company/settings.html',
        controller: 'OneCompanyCtrl',
        controllerAs: 'vm',
        data: {
          role: 'company'
        }
      });
  }
})();
