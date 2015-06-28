(function() {
  'use strict';

  angular
    .module('webApp')
    .controller('ManyIndependentsCtrl', ManyIndependentsCtrl);

  ManyIndependentsCtrl.$inject = ['dataIndependent', 'glitch', 'socket', '$state'];

  function ManyIndependentsCtrl(dataIndependent, glitch, socket, $state) {
    var vm = this;

    vm.independents = [];
    vm.glitch = glitch;
    vm.getMany = getMany;
    vm.remove = remove;

    ////////////

    activate();

    function activate() {
      // code...
    }

    ////////////

    function getMany() {
      vm.glitch.reset();
      dataIndependent.getMany()
        .then(function(independents) {
          vm.independents = independents;
        })
        .catch(vm.glitch.handle);
    }

    function remove(independent) {
      vm.glitch.reset();
      dataIndependent.remove(independent)
        .then(function() {
          vm.independents.forEach(function(elem, i, array) {
            if (array[i]._id === independent._id) {
              array.splice(i, 1);
            }
          });
          vm.glitch.setSuccess('Successfully deleted independent');
        })
        .catch(vm.glitch.handle);
    }
  }
})();
