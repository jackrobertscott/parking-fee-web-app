'use strict';

angular.module('webApp')
  .controller('ThemeCtrl', function ($scope, $state) {
    var Item = function(name, href, minRole, maxRole, children) {
      // This need to fixed as it replicates the environment variable
      var userRoles = ['guest', 'user', 'inspector', 'company', 'admin'];

      if (name) {this.name = name;} else {return menuError('name is not defined in item');}
      if (href) {this.href = href;} else {return menuError('href is not defined in item');}
      if (minRole) {
        if (userRoles.indexOf(minRole) !== -1) {
          this.minRole = minRole;
        } else {
          return menuError('min role is not valid in item');
        }
      }
      if (maxRole) {
        if (userRoles.indexOf(maxRole) !== -1) {
          this.maxRole = maxRole;
        } else {
          return menuError('max role is not valid in item');
        }
      }
      this.children = [];
      if (children instanceof Array) {
        children.forEach(function(child) {
          if (!child.minRole) {
            child.minRole = this.minRole;
          } else if (userRoles.indexOf(child.minRole) < userRoles.indexOf(this.minRole)) {
            menuError('child item\'s min role is less than it\'s parents');
            child.minRole = this.minRole;
          }
          if (!child.maxRole) {
            child.maxRole = this.maxRole;
          } else if (userRoles.indexOf(child.maxRole) > userRoles.indexOf(this.maxRole)) {
            menuError('child item\'s max role is more than it\'s parents');
            child.maxRole = this.maxRole;
          }
          this.children.push(child);
        });
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
      new Item('Home', '/'),
      new Item('Login', '/login', null, 'guest'),
      new Item('Logout', '/logout', 'user'),
      new Item('Setting', '/settings', 'user')
    ];

    $scope.isActive = function(route) {
      return $state.is(route);
    };

    var menuError = function(error) {
      console.log('A menu error occured: '+String(error));
    };
  });
