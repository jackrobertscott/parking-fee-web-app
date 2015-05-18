(function() {
  'use strict';

  angular
  .module('webApp')
  .config(config);

  config.$inject = ['stateProvider'];

  function config($stateProvider) {
    $stateProvider
    .state('user', {
      url: '/user',
      templateUrl: 'app/user/views/overview.html',
      controller: 'oneUserCtrl'
    });
  }
})();
