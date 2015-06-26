(function() {
  'use strict';

  angular
    .module('webApp')
    .controller('ThemeDashboardCtrl', ThemeDashboardCtrl);

  ThemeDashboardCtrl.$inject = ['$state', 'Auth', 'menu'];

  function ThemeDashboardCtrl($state, Auth, menu) {
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
      });
      menu.addItem({
        label: 'Park Owner',
        minRole: 'user',
        maxRole: 'user',
        direction: 'splash.independent',
        data: {
          glyphicon: 'briefcase'
        }
      });
      menu.addItem({
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
      });
      menu.addItem({
        label: 'Locations',
        minRole: 'user',
        direction: 'dashboard.location',
        data: {
          glyphicon: 'globe',
          route: 'dashboard.location'
        },
        // Role order confliction: independent should not register but independent and company should
        // children: [{
        //   label: 'Register',
        //   direction: 'dashboard.location.register'
        // }]
      });
      menu.addItem({
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
      });
      menu.addItem({
        label: 'Sessions',
        minRole: 'user',
        direction: 'dashboard.session',
        data: {
          glyphicon: 'calendar',
          route: 'dashboard.session'
        }
      });
      menu.addItem({
        label: 'Inspections',
        minRole: 'inspector',
        direction: 'dashboard.inspection',
        data: {
          glyphicon: 'eye-open',
          route: 'dashboard.inspection'
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
