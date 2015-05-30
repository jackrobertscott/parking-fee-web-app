(function() {
  'use strict';

  angular
  .module('webApp')
  .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
    .state('main', {
      url: '/',
      templateUrl: 'app/main/overview.html',
      controller: 'ManyMainsCtrl',
      controllerAs: 'vm'
    });
  }
})();
