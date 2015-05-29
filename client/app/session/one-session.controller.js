(function() {
  'use strict';

  angular
  .module('webApp')
  .controller('OneSessionCtrl', OneSessionCtrl);

  OneSessionCtrl.$inject = ['dataSession', 'tracto', '$state'];

  function OneSessionCtrl(dataSession, tracto, $state) {
    var vm = this;

    vm.item = {};
    vm.tracto = tracto;
    vm.submitted = false;
    vm.getOne = getOne;
    vm.create = create;
    vm.update = update;
    vm.remove = remove;

    ////////////

    activate();

    ////////////

    function activate() {
      // code
    }

    function getOne(id) {
      vm.tracto.reset();
      dataSession.getOne(id).then(function(item) {
        vm.item = item;
      }).catch(vm.tracto.handle);
    }

    function create(form) {
      vm.tracto.reset();
      vm.submitted = true;
      if (!form.$valid) {
        invalid();
      } else {
        dataSession.create(vm.item).then(function(item) {
          $state.go('session');
        }).catch(vm.tracto.handle);
      }
    }

    function update(form) {
      vm.tracto.reset();
      vm.submitted = true;
      if (!form.$valid) {
        invalid();
      } else {
        return dataSession.update(vm.item).then(function(item) {
          vm.tracto.good = 'Successfully updated';
        }).catch(vm.tracto.handle);
      }
    }

    function remove(form) {
      vm.tracto.reset();
      if (!form.$valid) {
        invalid();
      } else {
        dataSession.remove(vm.item).then(function() {
          vm.item = {};
          $state.go('session');
        }).catch(vm.tracto.handle);
      }
    }

    function invalid() {
      vm.submitted = true;
      vm.tracto.bad = 'Form is invalid';
    }
  }
})();
