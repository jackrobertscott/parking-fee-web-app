(function() {
  'use strict';

  angular
  .module('webApp')
  .controller('OneInfringementCtrl', OneInfringementCtrl);

  OneInfringementCtrl.$inject = ['dataInfringement', 'tracto', '$state'];

  function OneInfringementCtrl(dataInfringement, tracto, $state) {
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
      dataInfringement.getOne(id).then(function(item) {
        vm.item = item;
      }).catch(vm.tracto.handle);
    }

    function create(form) {
      vm.tracto.reset();
      vm.submitted = true;
      if (!form.$valid) {
        invalid();
      } else {
        dataInfringement.create(vm.item).then(function(item) {
          $state.go('infringement');
        }).catch(vm.tracto.handle);
      }
    }

    function update(form) {
      vm.tracto.reset();
      vm.submitted = true;
      if (!form.$valid) {
        invalid();
      } else {
        return dataInfringement.update(vm.item).then(function(item) {
          vm.tracto.good = 'Successfully updated';
        }).catch(vm.tracto.handle);
      }
    }

    function remove(form) {
      vm.tracto.reset();
      if (!form.$valid) {
        invalid();
      } else {
        dataInfringement.remove(vm.item).then(function() {
          vm.item = {};
          $state.go('infringement');
        }).catch(vm.tracto.handle);
      }
    }

    function invalid() {
      vm.submitted = true;
      vm.tracto.bad = 'Form is invalid';
    }
  }
})();
