(function() {
  'use strict';

  angular
    .module('auth')
    .factory('Auth', Auth);

  Auth.$inject = ['$location', '$rootScope', '$http', 'ResourceUser', '$cookieStore', '$q', '$window', 'glitch', 'ENV'];

  function Auth($location, $rootScope, $http, ResourceUser, $cookieStore, $q, $window, glitch, ENV) {
    var _this = this;
    var currentUser = {};
    if ($cookieStore.get('token')) {
      currentUser = ResourceUser.get();
    }

    var service = {
      login: login,
      logout: logout,
      createUser: createUser,
      changePassword: changePassword,
      getCurrentUser: getCurrentUser,
      isLoggedIn: isLoggedIn,
      isLoggedInAsync: isLoggedInAsync,
      isAdmin: isAdmin,
      getToken: getToken,
      getUserRoles: getUserRoles,
      reloadUser: reloadUser,
      loginOauth: loginOauth
    };

    return service;

    function login(user, cb) {
      cb = cb || angular.noop;
      var deferred = $q.defer();

      $http.post(ENV.apiEndpoint + 'auth/local', {
          email: user.email,
          password: user.password
        })
        .success(function(data) {
          $cookieStore.put('token', data.token);
          currentUser = ResourceUser.get(function() {
            deferred.resolve(data);
            return cb();
          });
        })
        .error(function(err) {
            logout();
            deferred.reject(err);
            return cb(err);
          }
          .bind(_this));

      return deferred.promise;
    }

    function logout() {
      $cookieStore.remove('token');
      currentUser = {};
    }

    function createUser(user) {
      return ResourceUser.save(user, function(data) {
        $cookieStore.put('token', data.token);
        currentUser = ResourceUser.get();
      }, function() {
        logout();
      }.bind(_this)).$promise;
    }

    function changePassword(oldPassword, newPassword) {
      return ResourceUser.changePassword({
        id: currentUser._id
      }, {
        oldPassword: oldPassword,
        newPassword: newPassword
      }).$promise;
    }

    function getCurrentUser() {
      return currentUser;
    }

    function isLoggedIn() {
      return currentUser.hasOwnProperty('role');
    }

    function isLoggedInAsync(cb) {
      if (currentUser.hasOwnProperty('$promise')) {
        currentUser.$promise
          .then(function() {
            cb(true);
          })
          .catch(function() {
            cb(false);
          });
      } else if (currentUser.hasOwnProperty('role')) {
        cb(true);
      } else {
        cb(false);
      }
    }

    function isAdmin() {
      return currentUser.role === 'admin';
    }

    function getToken() {
      return $cookieStore.get('token');
    }

    function loginOauth(provider) {
      $window.location.href = ENV.apiEndpoint + 'auth/' + provider;
    }

    function getUserRoles() {
      // These should mirror roles on server side environment
      return ['guest', 'user', 'inspector', 'independent', 'company', 'admin'];
    }

    function reloadUser(cb) {
      ResourceUser.get().$promise
        .then(function(user) {
          currentUser = user;
          cb();
        })
        .catch(function(err) {
          cb(err);
        });
    }

    function isBeforeOrEqual(role) {
      var roles = getUserRoles();
      return roles.indexOf(currentUser.role) >= roles.indexOf(role);
    }

    function isAfterOrEqual(role) {
      var roles = getUserRoles();
      return roles.indexOf(currentUser.role) <= roles.indexOf(role);
    }
  }
})();
