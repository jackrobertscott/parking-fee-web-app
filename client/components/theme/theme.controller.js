'use strict';

angular.module('webApp')
  .controller('ThemeCtrl', function ($scope, $state, Auth) {
    var Item = function(name, href, minRole, maxRole, children) {
      // This need to fixed as it replicates the environment variable
      var userRoles = ['guest', 'user', 'inspector', 'company', 'admin'];

      if (name) {this.name = name;} else {return menuError('name is not defined');}
      if (href) {this.href = href;} else {return menuError('href is not defined');}
      if (userRoles.indexOf(minRole) === -1) {this.minRole = minRole;} else {
        return menuError('minRole is not valid');
      }
      if (userRoles.indexOf(maxRole) === -1) {this.maxRole = maxRole;} else {
        return menuError('maxRole is not valid');
      }
      if (children instanceof Array) {
        this.children = children;
      } else if (children) {
        menuError('children must be an array');
      }
      this.isRoleIn = function(role) {
        if (userRoles.indexOf(role) === -1) {
          return menuError('valid role was not passed to role in function');
        }
        if (userRoles.indexOf(role) >= userRoles.indexOf(minRole) &&
        userRoles.indexOf(role) <= userRoles.indexOf(maxRole)) {
          return true;
        } else {
          return false;
        }
      };
    };

    $scope.menu = [];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $state.go('/login');
    };

    $scope.isActive = function(route) {
      return $state.is(route);
    };

    var menuError = function(error) {
      console.log('A menu error occured: '+String(error));
    };
  });
