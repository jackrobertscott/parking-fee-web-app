(function() {
  'use strict';

  angular
    .module('webApp')
    .controller('MembersCtrl', MembersCtrl);

  MembersCtrl.$inject = ['dataUser', 'glitch', 'socket', '$state', 'Auth'];

  function MembersCtrl(dataUser, glitch, socket, $state, Auth) {
    var vm = this;

    vm.member = {};
    vm.members = [];
    vm.users = [];
    vm.glitch = glitch;
    vm.getUsers = getUsers;
    vm.getCompanyMembers = getCompanyMembers;
    vm.companyAddCompany = companyAddCompany;
    vm.companyAddInspector = companyAddInspector;
    vm.companyRemoveMember = companyRemoveMember;

    ////////////

    activate();

    function activate() {
      // code...
    }

    ////////////

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
        .then(function(members) {
          vm.members = members;
          vm.member = members[0];
        })
        .catch(vm.glitch.handle);
    }

    function companyAddCompany(member) {
      vm.glitch.reset();
      if (member.role === 'admin') {
        vm.glitch.setError('Can not edit admins');
      } else if (member._id === Auth.getCurrentUser()._id) {
        vm.glitch.setError('Can not edit self');
      } else {
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
      if (member.role === 'admin') {
        vm.glitch.setError('Can not edit admins');
      } else if (member._id === Auth.getCurrentUser()._id) {
        vm.glitch.setError('Can not edit self');
      } else {
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
      if (member.role === 'admin') {
        vm.glitch.setError('Can not edit admins');
      } else if (member._id === Auth.getCurrentUser()._id) {
        vm.glitch.setError('Can not edit self');
      } else {
        dataUser.removeCompanyMember(member)
          .then(function() {
            // could be slow
            getCompanyMembers();
            getUsers();
          })
          .catch(vm.glitch.handle);
      }
    }
  }
})();
