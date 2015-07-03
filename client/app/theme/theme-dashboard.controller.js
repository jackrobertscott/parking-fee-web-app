(function() {
  'use strict';

  angular
    .module('webApp')
    .controller('ThemeDashboardCtrl', ThemeDashboardCtrl);

  ThemeDashboardCtrl.$inject = ['$state', 'Auth', 'menu'];

  function ThemeDashboardCtrl($state, Auth, menu) {
    var vm = this;

    vm.menu = [];
    vm.isActive = isActive;
    vm.isBeforeOrEqual = Auth.isBeforeOrEqual;
    vm.isAfterOrEqual = Auth.isAfterOrEqual;

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
        direction: 'dashboard.user.settings',
        data: {
          glyphicon: 'user',
          route: 'dashboard.user'
        },
        children: [{
          label: 'New Vehicle',
          direction: 'dashboard.user.register'
        }, {
          label: 'Settings',
          direction: 'dashboard.user.settings'
        }, {
          label: 'Change Password',
          direction: 'dashboard.user.password'
        }]
      }).addItem({
        label: 'Park Owner',
        minRole: 'user',
        maxRole: 'user',
        direction: 'barred.independent',
        data: {
          glyphicon: 'briefcase'
        }
      }).addItem({
        label: 'Company',
        minRole: 'company',
        direction: 'dashboard.company.settings',
        data: {
          glyphicon: 'briefcase',
          route: 'dashboard.company'
        },
        children: [{
          label: 'Settings',
          direction: 'dashboard.company.settings'
        }]
      }).addItem({
        label: 'Locations',
        minRole: 'user',
        direction: 'dashboard.location',
        data: {
          glyphicon: 'globe',
          route: 'dashboard.location'
        },
        children: [{
          label: 'New Location',
          minRole: 'independent',
          maxRole: 'company',
          direction: 'dashboard.location.register'
        }]
      }).addItem({
        label: 'Infringements',
        minRole: 'company',
        direction: 'dashboard.infringement.register',
        data: {
          glyphicon: 'exclamation-sign',
          route: 'dashboard.infringement'
        },
        children: [{
          label: 'Register',
          direction: 'dashboard.infringement.register',
        }]
      }).addItem({
        label: 'Sessions',
        minRole: 'user',
        direction: 'dashboard.session',
        data: {
          glyphicon: 'calendar',
          route: 'dashboard.session'
        }
      }).addItem({
        label: 'Inspections',
        minRole: 'company',
        direction: 'dashboard.inspection',
        data: {
          glyphicon: 'eye-open',
          route: 'dashboard.inspection'
        }
      }).addItem({
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
