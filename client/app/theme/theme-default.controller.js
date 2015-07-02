(function() {
  'use strict';

  angular
    .module('webApp')
    .controller('ThemeDefaultCtrl', ThemeDefaultCtrl);

  ThemeDefaultCtrl.$inject = ['$state', 'Auth', 'menu'];

  function ThemeDefaultCtrl($state, Auth, menu) {
    var vm = this;

    vm.menu = [];
    vm.isActive = isActive;
    vm.isBeforeOrEqual = Auth.isBeforeOrEqual;
    vm.isAfterOrEqual = Auth.isAfterOrEqual;
    vm.loginOauth = loginOauth;

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

    function loginOauth(provider) {
      Auth.loginOauth(provider);
    }

    function createMenu() {
      menu.reset();
      menu.addItem({
        label: 'Login',
        direction: 'barred.login',
        maxRole: 'guest'
      });
      menu.addItem({
        label: 'Dashboard',
        direction: 'dashboard.user.register',
        minRole: 'user'
      });
      menu.addItem({
        label: 'Sign-up',
        direction: 'barred.register',
        maxRole: 'guest'
      });
      menu.addItem({
        label: 'Park Owner',
        direction: 'barred.register',
        maxRole: 'guest',
      });
      menu.addItem({
        label: 'Park Owner',
        direction: 'barred.independent',
        minRole: 'user',
        maxRole: 'user'
      });
      menu.addItem({
        label: 'About',
        direction: 'barred.about'
      });
      menu.addItem({
        label: 'FAQ',
        direction: 'barred.faq'
      });
      menu.addItem({
        label: 'Terms',
        direction: 'barred.terms'
      });
      menu.addItem({
        label: 'Contact',
        direction: 'barred.contact'
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
