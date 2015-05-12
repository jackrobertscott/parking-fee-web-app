'use strict';

angular.module('webApp')
  .factory('Auth', function Auth($location, $rootScope, $http, User, $cookieStore, $q) {
    var currentUser = {};
    if ($cookieStore.get('token')) {
      currentUser = User.get();
    }

    return {

      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      login: function(user, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.post('/auth/local', {
          email: user.email,
          password: user.password
        }).
        success(function(data) {
          $cookieStore.put('token', data.token);
          currentUser = User.get();
          deferred.resolve(data);
          return cb();
        }).
        error(function(err) {
          this.logout();
          deferred.reject(err);
          return cb(err);
        }.bind(this));

        return deferred.promise;
      },

      /**
       * Delete access token and user info
       *
       * @param  {Function}
       */
      logout: function() {
        $cookieStore.remove('token');
        currentUser = {};
      },

      /**
       * Create a new user
       *
       * @param  {Object}   user     - user info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      createUser: function(user, callback) {
        var cb = callback || angular.noop;

        return User.save(user,
          function(data) {
            $cookieStore.put('token', data.token);
            currentUser = User.get();
            return cb(user);
          },
          function(err) {
            this.logout();
            return cb(err);
          }.bind(this)).$promise;
      },

      /**
       * Change password
       *
       * @param  {String}   oldPassword
       * @param  {String}   newPassword
       * @param  {Function} callback    - optional
       * @return {Promise}
       */
      changePassword: function(oldPassword, newPassword, callback) {
        var cb = callback || angular.noop;

        return User.changePassword({ id: currentUser._id }, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise;
      },

      /**
       * Gets all available info on authenticated user
       *
       * @return {Object} user
       */
      getCurrentUser: function() {
        return currentUser;
      },

      /**
       * Check if a user is logged in
       *
       * @return {Boolean}
       */
      isLoggedIn: function() {
        return currentUser.hasOwnProperty('role');
      },

      /**
       * Waits for currentUser to resolve before checking if user is logged in
       */
      isLoggedInAsync: function(cb) {
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
      },

      /**
       * Check if a user is an admin
       *
       * @return {Boolean}
       */
      isAdmin: function() {
        return currentUser.role === 'admin';
      },

      /**
       * Get auth token
       */
      getToken: function() {
        return $cookieStore.get('token');
      },

      // Added functions

      /**
       * Sets a company association with user
       *
       * @param  {Object} company
       * @param  {Function} callback    - optional
       */
      setCompany: function(company, callback) {
        var cb = callback || angular.noop;

        return User.setCompany({ id: currentUser._id }, {
         company: company
        }, function(user) {
         return cb(user);
        }, function(err) {
         return cb(err);
        }).$promise;
      },

      /**
       * Sets a company association with user
       *
       * @param  {Object} company
       * @param  {Function} callback    - optional
       */
      removeCompany: function(company, callback) {
        var cb = callback || angular.noop;

        return User.removeCompany({ id: currentUser._id }, {
         company: company
        }, function(user) {
         return cb(user);
        }, function(err) {
         return cb(err);
        }).$promise;
      },

      /**
       * Add a vehicle association with user
       *
       * @param  {Object} vehicle
       * @param  {Function} callback    - optional
       */
      addVehicle: function(vehicle, callback) {
        var cb = callback || angular.noop;

        return User.addVehicle({ id: currentUser._id }, {
         vehicle: vehicle
        }, function(user) {
         return cb(user);
        }, function(err) {
         return cb(err);
        }).$promise;
      },

      /**
       * Remove a vehicle association with user
       *
       * @param  {Object} vehicle
       * @param  {Function} callback    - optional
       */
      removeVehicle: function(vehicle, callback) {
        var cb = callback || angular.noop;

        return User.addVehicle({ id: currentUser._id }, {
         vehicle: vehicle
        }, function(user) {
         return cb(user);
        }, function(err) {
         return cb(err);
        }).$promise;
      },

      /**
       * Promotes a user's role
       *
       * @param  {Object} role
       * @param  {Function} callback    - optional
       */
      promote: function(role, callback) {
        var cb = callback || angular.noop;

        return User.promote({ id: currentUser._id }, {
          role: role
        }, function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise;
      },

      /**
       * Demotes a user's role
       *
       * @param  {Object} role
       * @param  {Function} callback    - optional
       */
      demote: function(role, callback) {
        var cb = callback || angular.noop;

        return User.demote({ id: currentUser._id }, {
          role: role
        }, function(user) {
          return cb(user);
        }, function(err) {
          return cb(err);
        }).$promise;
      }

    };
  });
