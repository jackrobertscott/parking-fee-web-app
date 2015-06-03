(function() {
  'use strict';

  angular
  .module('webApp')
  .controller('ThemeCtrl', ThemeCtrl);

  ThemeCtrl.$inject = ['$state', 'Auth', 'menu'];

  function ThemeCtrl($state, Auth, menu) {
    var vm = this;

    vm.isActive = isActive;
    vm.menu = [];

    activate();

    function activate() {
      Auth.isLoggedInAsync(function(isLoggedIn) {
        vm.menu = createMenu();
      });
    }

    function isActive(route) {
      return $state.is(route);
    }

    function createMenu() {
      menu.reset();
      menu.addItem({label: 'Home', direction: 'main'});
      menu.addItem({label: 'Login', direction: 'userLogin', maxRole: 'guest'});
      menu.addItem({label: 'Register', direction: 'userRegister', maxRole: 'guest'});
      menu.addItem({label: 'Change Password', direction: 'userPassword', minRole: 'user'});
      menu.addItem({label: 'Profile Settings', direction: 'userSettings', minRole: 'user'});
      menu.addItem({label: 'Admin', direction: 'userAdmin', minRole: 'admin'});
      menu.addItem({label: 'Register Company', direction: 'companyRegister', minRole: 'user', maxRole: 'user'});
      menu.addItem({label: 'Company', minRole: 'company', children: [
        {label: 'Admin', direction: 'companyAdmin', minRole: 'admin'},
        {label: 'Overview', direction: 'company'},
        {label: 'Settings', direction: 'companySettings'},
        {label: 'Members', direction: 'companyRegister'},
        {label: 'Inspections', direction: 'inspectionCompany'},
      ]});
      menu.addItem({label: 'All Locations', direction: 'location'});
      menu.addItem({label: 'Locations', minRole: 'company', children: [
        {label: 'My Locations', direction: 'locationCompany'},
        {label: 'New Location', direction: 'locationRegister'},
      ]});
      menu.addItem({label: 'Vehicles', minRole: 'user', children: [
        {label: 'Overview', direction: 'vehicle', minRole: 'admin'},
        {label: 'My Vehicles', direction: 'vehicleUser'},
        {label: 'Register New', direction: 'vehicleRegister'},
      ]});
      menu.addItem({label: 'Sessions', minRole: 'user', children: [
        {label: 'Overview', direction: 'session', minRole: 'admin'},
        {label: 'User Sessions', direction: 'sessionUser'},
      ]});
      menu.addItem({label: 'Infringements', minRole: 'user', children: [
        {label: 'Overview', direction: 'infringement', minRole: 'admin'},
        {label: 'Company Infringements', direction: 'infringementCompany', minRole: 'company'},
        {label: 'My Infringements', direction: 'inspectionUser'},
      ]});
      menu.addItem({label: 'Logout', direction: 'userLogout', minRole: 'user'});
      return menu.getItems();
    }
  }
})();
