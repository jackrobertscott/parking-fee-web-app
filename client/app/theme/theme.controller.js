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

    function isActive(route) {
      return $state.is(route);
    }

    function createMenu() {
      menu.reset();
      menu.addItem({
        label: 'Home',
        direction: 'main'
      });
      menu.addItem({
        label: 'Login',
        direction: 'login',
        maxRole: 'guest'
      });
      menu.addItem({
        label: 'Register',
        direction: 'register',
        maxRole: 'guest'
      });
      menu.addItem({
        label: 'Change Password',
        direction: 'app.user.password',
        minRole: 'user'
      });
      menu.addItem({
        label: 'Profile Settings',
        direction: 'app.user.settings',
        minRole: 'user'
      });
      menu.addItem({
        label: 'Admin',
        direction: 'userAdmin',
        minRole: 'admin'
      });
      menu.addItem({
        label: 'Register Company',
        direction: 'app.company.register',
        minRole: 'user',
        maxRole: 'user'
      });
      menu.addItem({
        label: 'Company',
        minRole: 'company',
        children: [{
          label: 'Admin',
          direction: 'companyAdmin',
          minRole: 'admin'
        }, {
          label: 'Overview',
          direction: 'company'
        }, {
          label: 'Settings',
          direction: 'app.company.settings'
        }, {
          label: 'Members',
          direction: 'app.company.register'
        }, {
          label: 'Inspections',
          direction: 'inspectionCompany'
        }, ]
      });
      menu.addItem({
        label: 'All Locations',
        direction: 'location'
      });
      menu.addItem({
        label: 'Locations',
        minRole: 'company',
        children: [{
          label: 'My Locations',
          direction: 'locationCompany'
        }, {
          label: 'New Location',
          direction: 'locationRegister'
        }, ]
      });
      menu.addItem({
        label: 'Vehicles',
        minRole: 'user',
        children: [{
          label: 'Overview',
          direction: 'vehicle',
          minRole: 'admin'
        }, {
          label: 'My Vehicles',
          direction: 'vehicleUser'
        }, {
          label: 'Register New',
          direction: 'vehicleRegister'
        }, ]
      });
      menu.addItem({
        label: 'Sessions',
        minRole: 'user',
        children: [{
          label: 'Overview',
          direction: 'session',
          minRole: 'admin'
        }, {
          label: 'User Sessions',
          direction: 'sessionUser'
        }, ]
      });
      menu.addItem({
        label: 'Infringements',
        minRole: 'user',
        children: [{
          label: 'Overview',
          direction: 'infringement',
          minRole: 'admin'
        }, {
          label: 'Company Infringements',
          direction: 'app.infringement.company',
          minRole: 'company'
        }, {
          label: 'My Infringements',
          direction: 'inspectionUser'
        }, ]
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
