'use strict';

angular.module('webApp')
  .controller('ThemeCtrl', function ($scope, $state, Auth) {
    var Item = function(name, href, minRole, maxRole, children) {
      // This need to fixed as it replicates the environment variable
      var userRoles = ['guest', 'user', 'inspector', 'company', 'admin'];

      if (name) {this.name = name;} else {return menuError('name is not defined in item');}
      if (href) {this.href = href;} else {return menuError('href is not defined in item');}
      if ((minRole && userRoles.indexOf(minRole) !== -1) && !minRole) {this.minRole = minRole;} else {
        return menuError('min role is not valid in item');
      }
      if ((maxRole && userRoles.indexOf(maxRole) !== -1) && !maxRole) {this.maxRole = maxRole;} else {
        return menuError('max role is not valid in item');
      }
      if (children instanceof Array) {
        this.children = children;
      } else if (children) {
        return menuError('children must be an array');
      }
      this.isRoleIn = function(role) {
        if (userRoles.indexOf(role) !== -1) {
          return menuError('valid role was not passed to role in function');
        }
        if ((!this.minRole || userRoles.indexOf(role) >= userRoles.indexOf(this.minRole)) &&
        (!this.maxRole || userRoles.indexOf(role) <= userRoles.indexOf(this.maxRole))) {
          return true;
        } else {
          return false;
        }
      };
    };

    $scope.menu = [
      new Item('Home', '/')
    ];

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
