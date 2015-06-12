(function() {
  'use strict';

  angular
    .module('webApp')
    .controller('ThemeCtrl', ThemeCtrl);

  ThemeCtrl.$inject = ['$state', 'Auth', 'menu'];

  function ThemeCtrl($state, Auth, menu) {
    var vm = this;

    vm.isActive = isActive;
    vm.isBeforeOrEqual = Auth.isBeforeOrEqual;
    vm.isAfterOrEqual = Auth.isAfterOrEqual;
    vm.menu = [];

    ////////////

    activate();

    function activate() {
      vm.menu = createMenu();
    }

    ////////////

    function isActive(route, exact) {
      if (exact) {
        return $state.is(route);
      } else {
        return $state.includes(route);
      }
    }

    function createMenu() {
      menu.reset();
      menu.addItem({
        label: 'Profile',
        minRole: 'user',
        direction: 'app.user.settings',
        data: {
          glyphicon: 'user'
        },
        children: [{
          label: 'Settings',
          direction: 'app.user.settings'
        }, {
          label: 'Change Password',
          direction: 'app.user.password'
        }]
      });
      menu.addItem({
        label: 'Company',
        minRole: 'company',
        direction: 'app.company.register',
        data: {
          glyphicon: 'briefcase'
        },
        children: [{
          label: 'Register',
          direction: 'app.company.register'
        }, {
          label: 'Settings',
          direction: 'app.company.settings'
        }]
      });
      menu.addItem({
        label: 'Locations',
        minRole: 'company',
        direction: 'app.location.register',
        data: {
          glyphicon: 'globe'
        },
        children: [{
          label: 'Register',
          direction: 'app.location.register'
        }]
      });
      menu.addItem({
        label: 'Vehicles',
        minRole: 'user',
        direction: 'app.vehicle.register',
        data: {
          glyphicon: 'bed'
        },
        children: [{
          label: 'Register',
          direction: 'app.vehicle.register'
        }, {
          label: 'Settings',
          direction: 'app.vehicle.settings'
        }]
      });
      menu.addItem({
        label: 'Infringements',
        minRole: 'user',
        direction: 'app.infringement.detail',
        data: {
          glyphicon: 'exclamation-sign'
        },
        children: [{
          label: 'Detail',
          direction: 'app.infringement.detail',
        }]
      });
      menu.addItem({
        label: 'Sessions',
        minRole: 'user',
        direction: 'app.session.detail',
        data: {
          glyphicon: 'calendar'
        },
        children: [{
          label: 'Detail',
          direction: 'app.session.detail',
        }]
      });
      menu.addItem({
        label: 'Inspections',
        minRole: 'inspector',
        direction: 'app.inspection.detail',
        data: {
          glyphicon: 'eye-open'
        },
        children: [{
          label: 'Detail',
          direction: 'app.inspection.detail',
        }]
      });
      menu.addItem({
        label: 'Logout',
        direction: 'logout',
        minRole: 'user',
        data: {
          glyphicon: 'off'
        }
      });
      return menu.getItems();
    }
  }
})();
