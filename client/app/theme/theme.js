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
        controllerAs: 'vmApp',
        resolve: {
          currentUser: currentUser
        }
      });
  }

  currentUser.$inject = ['Auth'];

  function currentUser(Auth) {
    return Auth.getCurrentUser().$promise;
  }
})();
