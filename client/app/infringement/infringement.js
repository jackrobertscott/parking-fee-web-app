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
        controllerAs: 'vmMany'
      })
      .state('app.infringement.detail', {
        url: '/detail/:id',
        templateUrl: 'app/infringement/infringement.detail.html',
        controller: 'OneInfringementCtrl',
        controllerAs: 'vmOne'
      });
  }
})();
