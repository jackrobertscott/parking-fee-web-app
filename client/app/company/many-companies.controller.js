(function() {
  'use strict';

  angular
  .module('webApp')
  .controller('ManyCompaniesCtrl', ManyCompaniesCtrl);

  ManyCompaniesCtrl.$inject = ['dataCompany', 'glitch', 'socket', '$state', 'Auth', 'dataUser'];

  function ManyCompaniesCtrl(dataCompany, glitch, socket, $state, Auth, dataUser) {
    var vm = this;

    vm.items = [];
    vm.users = [];
    vm.glitch = glitch;
    vm.getMany = getMany;
    vm.remove = remove;
    vm.getUsers = getUsers;
    vm.getCompanyMembers = getCompanyMembers;
    vm.companyAddCompany = companyAddCompany;
    vm.companyAddInspector = companyAddInspector;
    vm.companyRemoveMember = companyRemoveMember;
    vm.authenticate = authenticate;
    vm.unauthenticate = unauthenticate;

    ////////////

    activate();

    ////////////

    function activate() {
      // code
    }

    function getMany() {
      vm.glitch.reset();
      dataCompany.getMany()
      .then(function(items) {
        vm.items = items;
      })
      .catch(vm.glitch.handle);
    }

    function remove(item) {
      vm.glitch.reset();
      dataCompany.remove(item)
      .then(function() {
        vm.items.forEach(function(elem, i, array) {
          if (array[i]._id === item._id) {
            array.splice(i, 1);
          }
        });
        vm.glitch.setSuccess('Successfully deleted item');
      })
      .catch(vm.glitch.handle);
    }

    function getUsers() {
      vm.glitch.reset();
      dataUser.getMany()
      .then(function(users) {
        vm.users = users;
      })
      .catch(vm.glitch.handle);
    }

    function getCompanyMembers() {
      vm.glitch.reset();
      dataUser.getCompanyMembers(Auth.getCurrentUser().company)
      .then(function(items) {
        vm.items = items;
      })
      .catch(vm.glitch.handle);
    }

    function companyAddCompany(member) {
      vm.glitch.reset();
      if (member.role === 'admin') {vm.glitch.setError('Can not edit admins');}
      else if (member._id === Auth.getCurrentUser()._id) {vm.glitch.setError('Can not edit self');}
      else {
        dataUser.addCompanyMember(member, Auth.getCurrentUser().company, 'company')
        .then(function() {
          // could be slow
          getCompanyMembers();
          getUsers();
        })
        .catch(vm.glitch.handle);
      }
    }

    function companyAddInspector(member) {
      vm.glitch.reset();
      if (member.role === 'admin') {vm.glitch.setError('Can not edit admins');}
      else if (member._id === Auth.getCurrentUser()._id) {vm.glitch.setError('Can not edit self');}
      else {
        dataUser.addCompanyMember(member, Auth.getCurrentUser().company, 'inspector')
        .then(function() {
          // could be slow
          getCompanyMembers();
          getUsers();
        })
        .catch(vm.glitch.handle);
      }
    }

    function companyRemoveMember(member) {
      vm.glitch.reset();
      if (member.role === 'admin') {vm.glitch.setError('Can not edit admins');}
      else if (member._id === Auth.getCurrentUser()._id) {vm.glitch.setError('Can not edit self');}
      else {
        dataUser.removeCompanyMember(member)
        .then(function() {
          // could be slow
          getCompanyMembers();
          getUsers();
        })
        .catch(vm.glitch.handle);
      }
    }

    function authenticate(item) {
      vm.glitch.reset();
      item.authenticated = true;
      dataCompany.update(item)
      .then(function () {
        vm.glitch.setSuccess('Successfully authenticated company');
      })
      .catch(vm.glitch.handle);
    }

    function unauthenticate(item) {
      vm.glitch.reset();
      item.authenticated = false;
      dataCompany.update(item)
      .then(function () {
        vm.glitch.setSuccess('Successfully unauthenticated company');
      })
      .catch(vm.glitch.handle);
    }
  }
})();
