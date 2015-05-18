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
      template: '<p>Nothing here.</p>',
      controller: 'oneAdminCtrl'
    });
  }
})();
