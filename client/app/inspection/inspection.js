(function() {
  'use strict';

  angular
  .module('webApp')
  .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
    .state('inspection', {
      url: '/inspection',
      templateUrl: 'app/inspection/overview.html',
      controller: 'ManyInspectionsCtrl',
      controllerAs: 'vm',
      data: {
        role: 'admin'
      }
    })
    .state('inspectionCompany', {
      url: '/inspection/company',
      templateUrl: 'app/inspection/company.html',
      controller: 'ManyInspectionsCtrl',
      controllerAs: 'vm',
      data: {
        role: 'company'
      }
    })
    .state('inspectionUser', {
      url: '/inspection/user',
      templateUrl: 'app/inspection/user.html',
      controller: 'ManyInspectionsCtrl',
      controllerAs: 'vm',
      data: {
        role: 'user'
      }
    });
  }
})();
