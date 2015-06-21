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
        controllerAs: 'vmMany',
        data: {
          role: 'inspector'
        }
      })
      .state('app.inspection.detail', {
        url: '/detail/:id',
        templateUrl: 'app/inspection/inspection.detail.html',
        controller: 'OneInspectionCtrl',
        controllerAs: 'vmOne'
      });
  }
})();
