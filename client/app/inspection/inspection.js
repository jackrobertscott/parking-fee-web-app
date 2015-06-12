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
        controller: 'ManyInspectionsCtrl',
        controllerAs: 'vmMain'
      })
      .state('app.inspection.detail', {
        url: '/detail',
        templateUrl: 'app/inspection/detail.html',
        controller: 'OneInspectionCtrl',
        controllerAs: 'vm'
      });
  }
})();
