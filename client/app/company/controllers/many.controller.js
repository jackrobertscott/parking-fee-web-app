(function() {
  'use strict';

  angular
  .module('webApp')
  .controller('ManyCompaniesCtrl', ManyCompaniesCtrl);

  ManyCompaniesCtrl.$inject = ['dataCompany', 'tracto', '$state', 'Auth', 'dataUser'];

  function ManyCompaniesCtrl(dataCompany, tracto, $state, Auth, dataUser) {
    var vm = this;

    var currentUser = Auth.getCurrentUser();
    vm.items = [];
    vm.tracto = tracto;
    vm.getMany = getMany;
    vm.remove = remove;
    vm.getMembers = getMembers;
    vm.memberToCompany = memberToCompany;
    vm.memberToInspector = memberToInspector;
    vm.memberToUser = memberToUser;
    vm.authenticate = authenticate;
    vm.unauthenticate = unauthenticate;

    ////////////

    activate();

    ////////////

    function activate() {
      if (currentUser.role !== 'company' && currentUser.role !== 'admin') {
        $state.go('main');
      }
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

    function getMembers(id) {
      vm.tracto.reset();
      id = id || currentUser.company;
      dataCompany.getOne(id).then(function(company) {
        company.members.forEach(function(elem) { // slow
          dataUser.getOne(elem).then(function(member) {
            vm.items.push(member);
          }).catch(vm.tracto.handle);
        });
      }).catch(vm.tracto.handle);
    }

    function memberToCompany(member) {
      roleChecks(member, function() {
        member.role = 'company';
        dataUser.update(member).then(function() {
          vm.tracto.good = 'User\'s role was successfully updated';
        }).catch(vm.tracto.handle);
      });
    }

    function memberToInspector(member) {
      roleChecks(member, function() {
        member.role = 'inspector';
        dataUser.update(member).then(function() {
          vm.tracto.good = 'User\'s role was successfully updated';
        }).catch(vm.tracto.handle);
      });
    }

    function memberToUser(member) {
      roleChecks(member, function() {
        member.company = null;
        member.role = 'user';
        dataUser.update(member).then(function() {
          vm.tracto.good = 'User\'s role was successfully updated';
        }).catch(vm.tracto.handle);
      });
    }

    function roleChecks(member, cb) {
      if (member.role === 'admin') {
        vm.tracto.bad = 'Can not demote admins';
      } else if (member._id === currentUser._id) {
        vm.tracto.bad = 'Can not edit self';
      } else {
        cb();
      }
    }

    function authenticate(item) {
      vm.tracto.reset();
      if (Auth.getRole() !== 'admin') {return;}
      item.authenticated = true;
      dataCompany.update(item).then(function () {
        vm.tracto.good = 'Successfully authenticated company';
      }).catch(vm.tracto.handle);
    }

    function unauthenticate(item) {
      vm.tracto.reset();
      if (Auth.getRole() !== 'admin') {return;}
      item.authenticated = false;
      dataCompany.update(item).then(function () {
        vm.tracto.good = 'Successfully unauthenticated company';
      }).catch(vm.tracto.handle);
    }
  }
})();
