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
        controller: 'CompanyCtrl',
        controllerAs: 'vm',
        data: {
          role: 'user'
        }
      })
      .state('app.company.register', {
        url: '/register',
        templateUrl: 'app/company/company.register.html',
        data: {
          role: 'user'
        }
      })
      .state('app.company.settings', {
        url: '/settings',
        templateUrl: 'app/company/company.settings.html',
        data: {
          role: 'company'
        }
      })
      .state('app.members', {
        url: '/company',
        templateUrl: 'app/company/members.html',
        controller: 'CompanyCtrl',
        controllerAs: 'vm'
      })
      .state('app.members.detail', {
        url: '/detail',
        templateUrl: 'app/company/members.detail.html',
        data: {
          role: 'company'
        }
      });
  }
})();
