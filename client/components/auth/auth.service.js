(function() {
  'use strict';

  angular
  .module('webApp')
  .factory('Auth', Auth);

  Auth.$inject = ['$location', '$rootScope', '$http', 'ResourceUser', '$cookieStore', '$q'];

  function Auth($location, $rootScope, $http, ResourceUser, $cookieStore, $q) {
    var currentUser = {};
    var token = $cookieStore.get('token');
    if (token) {
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
      tokenChangeReload: tokenChangeReload
    };

    return service;

    function login(user, cb) {
      cb = cb || angular.noop;
      var deferred = $q.defer();

      $http.post('/auth/local', {
        email: user.email,
        password: user.password
      }).
      success(function(data) {
        $cookieStore.put('token', data.token);
        token = $cookieStore.get('token');
        currentUser = ResourceUser.get(function() {
          deferred.resolve(data);
          return cb();
        });
      }).
      error(function(err) {
        this.logout();
        deferred.reject(err);
        return cb(err);
      }.bind(this));

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
        this.logout();
      }.bind(this)).$promise;
    }

    function changePassword(oldPassword, newPassword) {
      return ResourceUser.changePassword({ id: currentUser._id }, {
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
        currentUser.$promise.then(function() {
          cb(true);
        }).catch(function() {
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

    function getUserRoles() {
      // These should mirror roles on server side environment
      return ['guest', 'user', 'inspector', 'company', 'admin'];
    }

    function tokenChangeReload(cb) {
      if ($cookieStore.get('token') && token && token.role !== $cookieStore.get('token').role) {
        currentUser = ResourceUser.get(function () {
          token = $cookieStore.get('token');
          cb();
        });
      } else {
        cb();
      }
    }
  }
})();
