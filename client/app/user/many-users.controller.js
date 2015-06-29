(function() {
  'use strict';

  angular
    .module('webApp')
    .controller('ManyUsersCtrl', ManyUsersCtrl);

  // Note: users do not have and end point socket
  ManyUsersCtrl.$inject = ['dataUser', 'glitch', 'Auth'];

  function ManyUsersCtrl(dataUser, glitch, Auth) {
    var vm = this;

    vm.users = [];
    vm.members = [];
    vm.glitch = glitch;
    vm.getMany = getMany;
    vm.getCompanyMembers = getCompanyMembers;
    vm.companyAddCompany = companyAddCompany;
    vm.companyAddInspector = companyAddInspector;
    vm.companyRemoveMember = companyRemoveMember;
    vm.remove = remove;

    ////////////

    activate();

    function activate() {
      // code...
    }

    ////////////

    function getMany() {
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
        })
        .catch(vm.glitch.handle);
    }

    function companyAddCompany(member) {
      vm.glitch.reset();
      if (member.role === 'admin' || member.role === 'independent') {
        vm.glitch.setError('Can not edit admins');
      } else if (member._id === Auth.getCurrentUser()._id) {
        vm.glitch.setError('Can not edit self');
      } else {
        dataUser.addCompanyMember(member, Auth.getCurrentUser().company, 'company')
          .then(function() {
            // reset!
          })
          .catch(vm.glitch.handle);
      }
    }

    function companyAddInspector(member) {
      vm.glitch.reset();
      if (member.role === 'admin' || member.role === 'independent') {
        vm.glitch.setError('Can not edit admins');
      } else if (member._id === Auth.getCurrentUser()._id) {
        vm.glitch.setError('Can not edit self');
      } else {
        dataUser.addCompanyMember(member, Auth.getCurrentUser().company, 'inspector')
          .then(function() {
            // reset!
          })
          .catch(vm.glitch.handle);
      }
    }

    function companyRemoveMember(member) {
      vm.glitch.reset();
      if (member.role === 'admin' || member.role === 'independent') {
        vm.glitch.setError('Can not edit admins');
      } else if (member._id === Auth.getCurrentUser()._id) {
        vm.glitch.setError('Can not edit self');
      } else {
        dataUser.removeCompanyMember(member)
          .then(function() {
            // reset!
          })
          .catch(vm.glitch.handle);
      }
    }

    function remove(user) {
      vm.glitch.reset();
      dataUser.remove(user)
        .then(function() {
          vm.users.forEach(function(elem, i, array) {
            if (array[i]._id === user._id) {
              array.splice(i, 1);
            }
          });
          vm.glitch.setSuccess('Successfully deleted user');
        })
        .catch(vm.glitch.handle);
    }
  }
})();
