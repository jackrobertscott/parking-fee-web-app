(function() {
  'use strict';

  angular
    .module('webApp')
    .controller('ThemeExternalCtrl', ThemeExternalCtrl);

  ThemeExternalCtrl.$inject = ['$state', 'Auth', 'menu'];

  function ThemeExternalCtrl($state, Auth, menu) {
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
        label: 'Login',
        direction: 'ext.login',
        maxRole: 'guest'
      });
      menu.addItem({
        label: 'Dashboard',
        direction: 'app.user.register',
        minRole: 'user'
      });
      menu.addItem({
        label: 'Park Owner',
        minRole: 'user',
        maxRole: 'user',
        direction: 'ext.independent'
      });
      menu.addItem({
        label: 'Sign-up',
        direction: 'ext.register',
        maxRole: 'guest'
      });
      menu.addItem({
        label: 'About',
        direction: 'ext.about'
      });
      menu.addItem({
        label: 'FAQ',
        direction: 'ext.faq'
      });
      menu.addItem({
        label: 'Terms',
        direction: 'ext.terms'
      });
      menu.addItem({
        label: 'Logout',
        direction: 'logout',
        minRole: 'user'
      });
      return menu.getItems();
    }
  }
})();
