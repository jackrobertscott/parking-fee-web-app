(function() {
  'use strict';

  angular
  .module('webApp')
  .controller('ThemeCtrl', ThemeCtrl);

  ThemeCtrl.$inject = ['$state', 'Item'];

  function ThemeCtrl($state, Item) {
    var vm = this;

    vm.toggleChildren = toggleChildren;
    vm.isActive = isActive;
    vm.menu = getMenu();

    activate();

    function activate() {
      // code
    }

    function toggleChildren(index) {
      vm.menu.forEach(function(item) {
        if (item.showChildren) {
          item.showChildren = false;
        }
      });
      vm.menu[index].showChildren = !vm.menu[index].showChildren;
    }

    function isActive(route) {
      return $state.is(route);
    }

    function getMenu() {
      return [
        new Item('Home', 'main'),
        new Item('Login', 'userLogin', null, 'guest'),
        new Item('Register', 'userRegister', null, 'guest'),
        new Item('Change Password', 'userPassword', 'user'),
        new Item('Users', 'user', 'admin'),
        new Item('Admin', 'userAdmin', 'admin'),
        new Item('Register Company', 'companyRegister', 'user', 'user'),
        new Item('Company', null, 'company', null, [
          new Item('Admin', 'companyAdmin', 'admin'),
          new Item('Overview', 'company'),
          new Item('Settings', 'companySettings'),
          new Item('Members', 'companyMembers'),
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
    }
  }
})();
