(function() {
  'use strict';

  angular
  .module('webApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'socket',
    'ui.router',
    'config',
    'tracto',
    'dataServices',
    'auth'
  ])
  .config(config)
  .factory('authInterceptor', authInterceptor)
  .run(run);

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider'];

  function config($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  }

  authInterceptor.$inject = ['$rootScope', '$q', '$cookieStore', '$location'];

  function authInterceptor($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if (response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  }

  run.$inject = ['$rootScope', '$location', 'Auth', 'tracto'];

  function run($rootScope, $location, Auth, tracto) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      tracto.reset();
      Auth.isLoggedInAsync(function(loggedIn) {
        if (toState.data && toState.data.role && toState.data.role !== 'guest') {
          var userRoles = Auth.getUserRoles();
          if (!loggedIn) {
            $location.path('/login');
          } else if (userRoles.indexOf(toState.data.role) > userRoles.indexOf(Auth.getCurrentUser().role)) {
            // Logged in but not authorised
            $location.path('/');
          }
        }
      });
    });
  }
})();
