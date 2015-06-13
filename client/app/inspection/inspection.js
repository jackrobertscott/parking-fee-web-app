(function() {
  'use strict';

  angular
    .module('webApp')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
      .state('app.inspection', {
        url: '/inspection',
        templateUrl: 'app/inspection/inspection.html',
        controller: 'InspectionCtrl',
        controllerAs: 'vm',
        data: {
          role: 'inspector'
        }
      })
      .state('app.inspection.detail', {
        url: '/detail',
        templateUrl: 'app/inspection/inspection.detail.html',
        data: {
          role: 'inspector'
        }
      });
  }
})();
