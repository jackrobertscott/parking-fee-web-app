(function() {
  'use strict';

  angular
  .module('webApp')
  .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
    .state('infringement', {
      url: '/',
      templateUrl: 'app/infringement/views/overview.html',
      controller: 'ManyInfringementsCtrl',
      controllerAs: 'vm'
    });
  }
})();
