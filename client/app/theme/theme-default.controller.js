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
      }).addItem({
        label: 'Dashboard',
        direction: 'dashboard.user.register',
        minRole: 'user'
      }).addItem({
        label: 'Sign-up',
        direction: 'barred.register',
        maxRole: 'guest'
      }).addItem({
        label: 'Park Owner',
        direction: 'barred.register',
        maxRole: 'guest',
      }).addItem({
        label: 'Park Owner',
        direction: 'barred.independent',
        minRole: 'user',
        maxRole: 'user'
      }).addItem({
        label: 'About',
        direction: 'barred.about'
      }).addItem({
        label: 'FAQ',
        direction: 'barred.faq'
      }).addItem({
        label: 'Terms',
        direction: 'barred.terms'
      }).addItem({
        label: 'Contact',
        direction: 'barred.contact'
      }).addItem({
        label: 'Logout',
        direction: 'logout',
        minRole: 'user'
      });
      return menu.getItems();
    }
  }
})();
