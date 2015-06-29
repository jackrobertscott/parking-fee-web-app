(function() {
  'use strict';

  angular
    .module('webApp')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
      .state('dashboard.infringement', {
        url: '/infringement',
        templateUrl: 'app/infringement/infringement.html',
        controller: 'ManyInfringementsCtrl',
        controllerAs: 'vmMany'
      })
      .state('dashboard.infringement.register', {
        url: '/register',
        templateUrl: 'app/infringement/infringement.register.html',
        controller: 'OneInfringementCtrl',
        controllerAs: 'vmOne'
      })
      .state('dashboard.infringement.settings', {
        url: '/settings/:id',
        templateUrl: 'app/infringement/infringement.settings.html',
        controller: 'OneInfringementCtrl',
        controllerAs: 'vmOne'
      });
  }
})();
