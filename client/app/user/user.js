(function() {
  'use strict';

  angular
    .module('webApp')
    .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider
      .state('ext.register', {
        url: '/register',
        templateUrl: 'app/user/register.html',
        controller: 'OneUserCtrl',
        controllerAs: 'vmOne'
      })
      .state('ext.login', {
        url: '/login',
        templateUrl: 'app/user/login.html',
        controller: 'OneUserCtrl',
        controllerAs: 'vmOne'
      })
      .state('logout', {
        url: '/logout',
        templateUrl: 'app/user/logout.html',
        controller: 'OneUserCtrl',
        controllerAs: 'vmOne'
      })
      .state('app.user', {
        url: '/user',
        templateUrl: 'app/user/user.html',
        controller: 'ManyVehiclesCtrl',
        controllerAs: 'vmMany'
      })
      .state('app.user.password', {
        url: '/password',
        templateUrl: 'app/user/user.password.html',
        controller: 'OneUserCtrl',
        controllerAs: 'vmOne',
        data: {
          role: 'user'
        }
      })
      .state('app.user.settings', {
        url: '/settings',
        templateUrl: 'app/user/user.settings.html',
        controller: 'OneUserCtrl',
        controllerAs: 'vmOne',
        data: {
          role: 'user'
        }
      })
      .state('app.user.register', {
        url: '/vehicle/register',
        templateUrl: 'app/vehicle/vehicle.register.html',
        controller: 'OneVehicleCtrl',
        controllerAs: 'vmOne',
        data: {
          role: 'user'
        }
      })
      .state('app.user.vehicle', {
        url: '/vehicle/:id',
        templateUrl: 'app/vehicle/vehicle.settings.html',
        controller: 'OneVehicleCtrl',
        controllerAs: 'vmOne',
        data: {
          role: 'user'
        }
      });
  }
})();
