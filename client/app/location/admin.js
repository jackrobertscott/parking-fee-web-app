(function() {
  'use strict';

  angular
  .module('webApp')
  .config(config);

  config.$inject = ['stateProvider'];

  function config($stateProvider) {
    $stateProvider
    .state('location', {
      url: '/location',
      templateUrl: 'app/location/views/overview.html',
      controller: 'oneLocationCtrl'
    });
  }
})();
