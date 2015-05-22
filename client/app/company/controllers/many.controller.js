(function() {
  'use strict';

  angular
  .module('webApp')
  .controller('ManyCompaniesCtrl', ManyCompaniesCtrl);

  ManyCompaniesCtrl.$inject = ['dataCompany', 'tracto', 'socket', '$state', 'Auth', 'dataUser'];

  function ManyCompaniesCtrl(dataCompany, tracto, socket, $state, Auth, dataUser) {
    var vm = this;

    vm.items = [];
    vm.users = [];
    vm.tracto = tracto;
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
      vm.tracto.reset();
      dataCompany.getMany().then(function(items) {
        vm.items = items;
      }).catch(vm.tracto.handle);
    }

    function remove(item) {
      vm.tracto.reset();
      dataCompany.remove(item).then(function() {
        vm.items.forEach(function(elem, i, array) {
          if (array[i]._id === item._id) {
            array.splice(i, 1);
          }
        });
        vm.tracto.good = 'Successfully deleted item';
      }).catch(vm.tracto.handle);
    }

    function getUsers() {
      vm.tracto.reset();
      dataUser.getMany().then(function(users) {
        vm.users = users;
      }).catch(vm.tracto.handle);
    }

    function getCompanyMembers() {
      vm.tracto.reset();
      dataCompany.getCompanyMembers(Auth.getCurrentUser().company)
      .then(function(items) {
        vm.items = items;
      }).catch(vm.tracto.handle);
    }

    function companyAddCompany(member) {
      vm.tracto.reset();
      if (member.role === 'admin') {vm.tracto.bad = 'Can not edit admins';}
      else if (member._id === Auth.getCurrentUser()._id) {vm.tracto.bad = 'Can not edit self';}
      else {
        dataUser.addCompanyMember(member, Auth.getCurrentUser().company, 'company')
        .then(function() {
          getCompanyMembers();
        }).catch(vm.tracto.handle);
      }
    }

    function companyAddInspector(member) {
      vm.tracto.reset();
      if (member.role === 'admin') {vm.tracto.bad = 'Can not edit admins';}
      else if (member._id === Auth.getCurrentUser()._id) {vm.tracto.bad = 'Can not edit self';}
      else {
        dataUser.addCompanyMember(member, Auth.getCurrentUser().company, 'inspector')
        .then(function() {
          getCompanyMembers();
        }).catch(vm.tracto.handle);
      }
    }

    function companyRemoveMember(member) {
      vm.tracto.reset();
      if (member.role === 'admin') {vm.tracto.bad = 'Can not edit admins';}
      else if (member._id === currentUser._id) {vm.tracto.bad = 'Can not edit self';}
      else {
        dataUser.removeCompanyMember(member)
        .then(function() {
          getCompanyMembers();
        }).catch(vm.tracto.handle);
      }
    }

    function authenticate(item) {
      vm.tracto.reset();
      item.authenticated = true;
      dataCompany.update(item).then(function () {
        vm.tracto.good = 'Successfully authenticated company';
      }).catch(vm.tracto.handle);
    }

    function unauthenticate(item) {
      vm.tracto.reset();
      item.authenticated = false;
      dataCompany.update(item).then(function () {
        vm.tracto.good = 'Successfully unauthenticated company';
      }).catch(vm.tracto.handle);
    }
  }
})();
