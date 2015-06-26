(function() {
  'use strict';

  angular
    .module('webApp')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
      .state('app.company', {
        url: '/company',
        templateUrl: 'app/company/company.html',
        controller: 'ManyUsersCtrl',
        controllerAs: 'vmMany',
        data: {
          role: 'user'
        }
      })
      .state('ext.company', { // not a subview of many company state
        url: '/company/register',
        templateUrl: 'app/company/register.html',
        controller: 'OneCompanyCtrl',
        controllerAs: 'vmOne',
        data: {
          role: 'user'
        }
      })
      .state('app.company.settings', {
        url: '/settings',
        templateUrl: 'app/company/company.settings.html',
        controller: 'OneCompanyCtrl',
        controllerAs: 'vmOne',
        data: {
          role: 'company'
        }
      });
  }
})();
