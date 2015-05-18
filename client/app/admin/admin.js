(function() {
  'use strict';

  angular
  .module('webApp')
  .config(config);

  config.$inject = ['stateProvider'];

  function config($stateProvider) {
    $stateProvider
    .state('admin', {
      url: '/admin',
      templateUrl: 'app/admin/views/overview.html',
      controller: 'oneAdminCtrl'
    });
  }
})();
