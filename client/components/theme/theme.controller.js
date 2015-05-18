(function() {
  'use strict';

  angular
  .module('webApp')
  .controller('ThemeCtrl', ThemeCtrl);

  ThemeCtrl.$inject = ['$state', 'Auth'];

  function ThemeCtrl($state, Auth) {
    var vm = this;

    var role = Auth.getRole();
    vm.toggleChildren = toggleChildren;
    vm.isActive = isActive;
    vm.menu = [
      new Item('Home', 'main'),
      new Item('Login', 'userLogin', null, 'guest'),
      new Item('Register', 'userRegister', null, 'guest'),
      new Item('Settings', 'userSettings', 'user'),
      new Item('Users', 'user', 'admin'),
      new Item('Admin', 'userAdmin', 'admin'),
      new Item('Company', null, 'user', null, [
        new Item('Overview', 'company', 'admin'),
        new Item('Settings', 'companySettings', 'company'),
        new Item('Register', 'companyRegister'),
      ]),
      new Item('Location', null, 'user', null, [
        new Item('Overview', 'location'),
        new Item('My Locations', 'locationCompany', 'company'),
        new Item('New Location', 'locationRegister', 'company'),
      ]),
      new Item('Vehicles', null, 'user', null, [
        new Item('Overview', 'vehicle', 'admin'),
        new Item('My Vehicles', 'vehicleUser'),
        new Item('Register New', 'vehicleRegister'),
      ]),
      new Item('Logout', 'userLogout', 'user'),
    ];

    activate();

    function activate() {
      // code
    }

    function toggleChildren(index) {
      vm.menu[index].showChildren = !vm.menu[index].showChildren;
    }

    function isActive(route) {
      return $state.is(route);
    }

    function menuError(error) {
      console.log('A menu error occured: '+String(error));
    }

    var Item = function(name, href, minRole, maxRole, children) {
      // This need to fixed as it replicates the environment variable
      var userRoles = ['guest', 'user', 'inspector', 'company', 'admin'];
      var currentRole = role;
      this.showChildren = false;

      if (name) {this.name = name;} else {return menuError('name is not defined in item');}
      this.href = href;
      this.minRole = null;
      if (minRole) {
        if (userRoles.indexOf(minRole) === -1) {
          return menuError('min role is not valid in item');
        } else {
          this.minRole = minRole;
        }
      }
      this.maxRole = null;
      if (maxRole) {
        if (userRoles.indexOf(maxRole) === -1) {
          return menuError('max role is not valid in item');
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
            menuError('child item\'s min role is less than it\'s parents');
            child.minRole = this.minRole;
          }
          if (!child.maxRole || !this.maxRole) {
            child.maxRole = this.maxRole;
          } else if (userRoles.indexOf(child.maxRole) > userRoles.indexOf(this.maxRole)) {
            menuError('child item\'s max role is more than it\'s parents');
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
  }
})();
