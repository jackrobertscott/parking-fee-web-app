(function() {
  'use strict';

  angular
    .module('webApp')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    // Remove comments and add states
    // $stateProvider
    //   .state('dashboard.xxxLCPHxxx', {
    //     url: '/xxxLCPHxxx',
    //     templateUrl: 'app/xxxLCPHxxx/xxxLCPHxxx.html',
    //     controller: 'ManyXxxUCPHxxxsCtrl',
    //     controllerAs: 'vmMany'
    //   });
  }
})();
