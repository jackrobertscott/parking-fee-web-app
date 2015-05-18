(function() {
  'use strict';

  angular
  .module('webApp')
  .config(config);

  config.$inject = ['stateProvider'];

  function config($stateProvider) {
    $stateProvider
    .state('company', {
      url: '/company',
      templateUrl: 'app/company/views/overview.html',
      controller: 'oneCompanyCtrl'
    });
  }
})();
