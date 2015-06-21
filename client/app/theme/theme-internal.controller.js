(function() {
  'use strict';

  angular
    .module('webApp')
    .controller('ThemeInternalCtrl', ThemeInternalCtrl);

  ThemeInternalCtrl.$inject = ['$state', 'Auth', 'menu'];

  function ThemeInternalCtrl($state, Auth, menu) {
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
          glyphicon: 'user',
          route: 'app.user'
        },
        children: [{
          label: 'New Vehicle',
          direction: 'app.user.register'
        }, {
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
        direction: 'app.company.settings',
        data: {
          glyphicon: 'briefcase',
          route: 'app.company'
        },
        children: [{
          label: 'Settings',
          direction: 'app.company.settings'
        }]
      });
      menu.addItem({
        label: 'Locations',
        minRole: 'company',
        direction: 'app.location.register',
        data: {
          glyphicon: 'globe',
          route: 'app.location'
        },
        children: [{
          label: 'Register',
          direction: 'app.location.register'
        }]
      });
      menu.addItem({
        label: 'Infringements',
        minRole: 'company',
        direction: 'app.infringement.register',
        data: {
          glyphicon: 'exclamation-sign',
          route: 'app.infringement'
        },
        children: [{
          label: 'Register',
          direction: 'app.infringement.register',
        }]
      });
      menu.addItem({
        label: 'Sessions',
        minRole: 'user',
        direction: 'app.session',
        data: {
          glyphicon: 'calendar',
          route: 'app.session'
        }
      });
      menu.addItem({
        label: 'Inspections',
        minRole: 'inspector',
        direction: 'app.inspection',
        data: {
          glyphicon: 'eye-open',
          route: 'app.inspection'
        }
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
