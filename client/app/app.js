(function() {
  'use strict';

  angular
    .module('webApp', [
      'ngCookies',
      'ngResource',
      'ngSanitize',
      'uiGmapgoogle-maps',
      'socket',
      'ui.router',
      'config',
      'glitch',
      'dataServices',
      'auth',
      'menu'
    ])
    .config(config)
    .factory('authInterceptor', authInterceptor)
    .run(allowAccess);

  config.$inject = ['$urlRouterProvider', '$locationProvider', '$httpProvider', 'uiGmapGoogleMapApiProvider'];

  function config($urlRouterProvider, $locationProvider, $httpProvider, uiGmapGoogleMapApiProvider) {
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
    uiGmapGoogleMapApiProvider.configure({
      // key: 'your api key',
      v: '3.17',
      // libraries: 'visualization'
    });
  }

  authInterceptor.$inject = ['$rootScope', '$q', '$cookieStore', '$injector'];

  function authInterceptor($rootScope, $q, $cookieStore, $injector) {
    return {
      // Add authorization token to headers
      request: function(config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if (response.status === 401) {
          console.log('unauthorised: api');
          // remove any stale tokens
          $cookieStore.remove('token');
          $injector.get('$state').go('barred.login');
          return $q.reject(response);
        } else {
          return $q.reject(response);
        }
      }
    };
  }

  allowAccess.$inject = ['$rootScope', '$state', 'Auth', 'glitch'];

  function allowAccess($rootScope, $state, Auth, glitch) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      glitch.reset();
      Auth.isLoggedInAsync(function(loggedIn) {
        if (toState.data && toState.data.role && toState.data.role !== 'guest') {
          var userRoles = Auth.getUserRoles();
          if (!loggedIn) {
            $state.go('barred.login');
            console.log('unauthorised: not logged in');
          } else if (userRoles.indexOf(toState.data.role) > userRoles.indexOf(Auth.getCurrentUser().role)) {
            // Logged in but not authorised
            $state.go('dashboard.user.settings');
            console.log('unauthorised: role no access');
          }
        }
      });
    });
  }
})();
