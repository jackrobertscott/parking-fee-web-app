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
    vm.people = [];
    vm.tracto = tracto;
    vm.getMany = getMany;
    vm.remove = remove;
    vm.getPeople = getPeople;
    vm.getMembers = getMembers;
    vm.personToCompany = personToCompany;
    vm.personToInspector = personToInspector;
    vm.personToUser = personToUser;
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

    function getPeople() {
      vm.tracto.reset();
      dataUser.getMany().then(function(people) {
        vm.people = people;
        vm.people.forEach(function(person, i, array) {
          if (person.role === 'admin') { // remove admins
            array.splice(i, 1);
          }
        });
      }).catch(vm.tracto.handle);
    }

    function getMembers() {
      vm.tracto.reset();
      vm.items = [];
      dataCompany.getOne(currentUser.company).then(function(company) {
        company.members.forEach(function(elem) { // slow
          dataUser.getOne(elem).then(function(member) {
            vm.items.push(member);
          }).catch(vm.tracto.handle);
        });
      }).catch(vm.tracto.handle);
    }

    function personToCompany(member) {
      vm.tracto.reset();
      updateMember(member, 'company', currentUser.company);
    }

    function personToInspector(member) {
      vm.tracto.reset();
      updateMember(member, 'inspector', currentUser.company);
    }

    function personToUser(member) {
      vm.tracto.reset();
      updateMember(member, 'user', null);
    }

    function updateMember(member, role, company) {
      if (member.role === 'admin') {
        vm.tracto.bad = 'Can not demote admins';
      } else if (member._id === currentUser._id) {
        vm.tracto.bad = 'Can not edit self';
      } else {
        member.company = company;
        member.role = role;
        // update user
        dataUser.update(member).then(function() {
          vm.tracto.good = 'User\'s role was successfully updated';
        }).catch(vm.tracto.handle);
        // update company
        dataCompany.getOne(currentUser.company)
        .then(function(company) {
          if (member.company) {
            dataCompany.addMember(company, member._id); // server does not correctly update
          } else {
            dataCompany.removeMember(company, member._id); // server does not correctly update
          }
          getMembers();
        }).catch(vm.tracto.handle);
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
