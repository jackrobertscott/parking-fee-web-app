(function() {
  'use strict';

  angular
    .module('webApp')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
      .state('app', {
        abstract: true,
        templateUrl: 'app/theme/theme.html',
        controller: 'ThemeCtrl',
        controllerAs: 'vmApp'
      });
  }
})();
