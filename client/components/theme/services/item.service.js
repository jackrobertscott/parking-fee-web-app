(function() {
  'use strict';

  angular
  .module('webApp')
  .factory('Item', Item);

  Item.$inject = ['Auth'];

  function Item(Auth) {
    var userRoles = Auth.getUserRoles();
    var currentRole = Auth.getCurrentUser().role;

    return function(name, href, minRole, maxRole, children) {
      if (name) {this.name = name;} else {return menuError('name is not defined in Item');}
      this.href = href;
      this.showChildren = false;
      this.minRole = null;
      if (minRole) {
        if (userRoles.indexOf(minRole) === -1) {
          return menuError('min role is not valid in Item');
        } else {
          this.minRole = minRole;
        }
      }
      this.maxRole = null;
      if (maxRole) {
        if (userRoles.indexOf(maxRole) === -1) {
          return menuError('max role is not valid in Item');
        } else {
          this.maxRole = maxRole;
        }
      }
      this.children = [];
      if (angular.isArray(children)) {
        children.forEach(function(child) {
          if (!child.minRole || !this.minRole) {
            child.minRole = this.minRole;
          } else if (userRoles.indexOf(child.minRole) < userRoles.indexOf(this.minRole)) {
            menuError('child Item\'s min role is less than it\'s parents');
            child.minRole = this.minRole;
          }
          if (!child.maxRole || !this.maxRole) {
            child.maxRole = this.maxRole;
          } else if (userRoles.indexOf(child.maxRole) > userRoles.indexOf(this.maxRole)) {
            menuError('child Item\'s max role is more than it\'s parents');
            child.maxRole = this.maxRole;
          }
          this.children.push(child);
        }, this);
      } else if (children) {
        return menuError('children must be an array');
      }
      this.show = function() {
        if (!currentRole) {
          currentRole = userRoles[0];
        }
        if (userRoles.indexOf(currentRole) === -1) {
          return menuError('user\'s role was not found in controller list: '+role);
        }
        if ((!this.minRole || userRoles.indexOf(currentRole) >= userRoles.indexOf(this.minRole)) &&
        (!this.maxRole || userRoles.indexOf(currentRole) <= userRoles.indexOf(this.maxRole))) {
          return true;
        } else {
          return false;
        }
      };
    };

    function menuError(error) {
      console.log('Menu error occured: '+String(error));
    }
  }
})();
