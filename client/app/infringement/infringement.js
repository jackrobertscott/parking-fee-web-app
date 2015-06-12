(function() {
  'use strict';

  angular
    .module('webApp')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
      .state('infringement', {
        url: '/infringement',
        templateUrl: 'app/infringement/infringement.html',
        controller: 'ManyInfringementsCtrl',
        controllerAs: 'vmMain'
      });
  }
})();
