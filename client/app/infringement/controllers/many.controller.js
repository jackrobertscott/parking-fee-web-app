(function() {
  'use strict';

  angular
  .module('webApp')
  .controller('ManyInfringementsCtrl', ManyInfringementsCtrl);

  ManyInfringementsCtrl.$inject = ['dataInfringement', 'tracto', 'socket', 'Auth', 'dataSession'];

  function ManyInfringementsCtrl(dataInfringement, tracto, socket, Auth, dataSession) {
    var vm = this;

    vm.items = [];
    vm.tracto = tracto;
    vm.getMany = getMany;
    vm.remove = remove;

    ////////////

    activate();

    ////////////

    function activate() {
      // code
    }

    function getMany() {
      vm.tracto.reset();
      dataInfringement.getMany().then(function(items) {
        vm.items = items;
      }).catch(vm.tracto.handle);
    }

    function remove(item) {
      vm.tracto.reset();
      dataInfringement.remove(item).then(function() {
        vm.items.forEach(function(elem, i, array) {
          if (array[i]._id === item._id) {
            array.splice(i, 1);
          }
        });
        vm.tracto.good = 'Successfully deleted item';
      }).catch(vm.tracto.handle);
    }

    function getFewCompany() {
      vm.tracto.reset();
      dataSession.getFewCompany(Auth.getCurrentUser().company)
      .then(function(items) {
        vm.items = items;
      }).catch(vm.tracto.handle);
    }

    function getFewUser() {
      vm.tracto.reset();
      dataSession.getFewUser(Auth.getCurrentUser()._id)
      .then(function(items) {
        vm.items = items;
      }).catch(vm.tracto.handle);
    }
  }
})();
