(function() {
  'use strict';

  angular
    .module('webApp')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
      .state('inspection', {
        url: '/inspection',
        templateUrl: 'app/inspection/inspection.html',
        controller: 'ManyInspectionsCtrl',
        controllerAs: 'vmMain'
      });
  }
})();
