(function() {
  'use strict';

  angular
  .module('webApp')
  .config(config);

  config.$inject = ['stateProvider'];

  function config($stateProvider) {
    $stateProvider
    .state('vehicle', {
      url: '/vehicle',
      templateUrl: 'app/vehicle/views/overview.html',
      controller: 'oneVehicleCtrl'
    });
  }
})();
