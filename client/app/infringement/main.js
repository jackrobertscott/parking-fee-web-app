(function() {
  'use strict';

  angular
  .module('webApp')
  .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
    .state('infringement', {
      url: '/infringement',
      templateUrl: 'app/infringement/views/overview.html',
      controller: 'ManyInfringementsCtrl',
      controllerAs: 'vm',
      data: {
        role: 'admin'
      }
    })
    .state('infringementCompany', {
      url: '/infringement/company',
      templateUrl: 'app/infringement/views/company.html',
      controller: 'ManyInfringementsCtrl',
      controllerAs: 'vm',
      data: {
        role: 'company'
      }
    });
  }
})();
