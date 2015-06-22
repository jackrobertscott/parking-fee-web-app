(function() {
  'use strict';

  angular
    .module('webApp')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    // Remove comments and add states
    // $stateProvider
    //   .state('app.independent', {
    //     url: '/independent',
    //     templateUrl: 'app/independent/independent.html',
    //     controller: 'ManyIndependentCtrl',
    //     controllerAs: 'vmMany'
    //   });
  }
})();
