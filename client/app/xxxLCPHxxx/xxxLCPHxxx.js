(function() {
  'use strict';

  angular
    .module('webApp')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    /* Remove comments and add states
    $stateProvider
    .state('xxxLCPHxxx', {
      url: '/',
      templateUrl: 'app/xxxLCPHxxx/overview.html',
      controller: 'ManyXxxUCPHxxxsCtrl',
      controllerAs: 'vm'
    });
    */
  }
})();