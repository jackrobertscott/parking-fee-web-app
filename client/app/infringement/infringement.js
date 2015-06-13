(function() {
  'use strict';

  angular
    .module('webApp')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
      .state('app.infringement', {
        url: '/infringement',
        templateUrl: 'app/infringement/infringement.html',
        controller: 'InfringementCtrl',
        controllerAs: 'vm'
      })
      .state('app.infringement.detail', {
        url: '/detail',
        templateUrl: 'app/infringement/infringement.detail.html',
        data: {
          role: 'user'
        }
      });
  }
})();
