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
        controller: 'ManyInfringementsCtrl',
        controllerAs: 'vmMain'
      })
      .state('app.infringement.detail', {
        url: '/detail',
        templateUrl: 'app/infringement/detail.html',
        controller: 'OneInfringementCtrl',
        controllerAs: 'vm'
      });
  }
})();
