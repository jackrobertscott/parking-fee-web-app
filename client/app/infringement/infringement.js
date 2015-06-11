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
        templateUrl: 'app/infringement/overview.html',
        controller: 'ManyInfringementsCtrl',
        controllerAs: 'vm',
        data: {
          role: 'admin'
        }
      })
      .state('infringementCompany', {
        url: '/infringement/company',
        templateUrl: 'app/infringement/company.html',
        controller: 'ManyInfringementsCtrl',
        controllerAs: 'vm',
        data: {
          role: 'company'
        }
      })
      .state('infringementRegister', {
        url: '/infringement/register',
        templateUrl: 'app/infringement/register.html',
        controller: 'ManyInfringementsCtrl',
        controllerAs: 'vm',
        data: {
          role: 'company'
        }
      })
      .state('infringementSettings', {
        url: '/infringement/settings/:id',
        templateUrl: 'app/infringement/settings.html',
        controller: 'ManyInfringementsCtrl',
        controllerAs: 'vm',
        data: {
          role: 'company'
        }
      });
  }
})();