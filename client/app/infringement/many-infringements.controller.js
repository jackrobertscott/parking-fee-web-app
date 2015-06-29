(function() {
  'use strict';

  angular
    .module('webApp')
    .controller('ManyInfringementsCtrl', ManyInfringementsCtrl);

  ManyInfringementsCtrl.$inject = ['dataInfringement', 'glitch', 'socket', 'Auth', '$state'];

  function ManyInfringementsCtrl(dataInfringement, glitch, socket, Auth, $state) {
    var vm = this;

    vm.infringements = [];
    vm.glitch = glitch;
    vm.getMany = getMany;
    vm.remove = remove;
    vm.toSettings = toSettings;
    vm.getFewCompany = getFewCompany;

    ////////////

    activate();

    function activate() {
      // code...
    }

    ////////////

    function getMany() {
      vm.glitch.reset();
      dataInfringement.getMany()
        .then(function(infringements) {
          vm.infringements = infringements;
        })
        .catch(vm.glitch.handle);
    }

    function remove(infringement) {
      vm.glitch.reset();
      dataInfringement.remove(infringement)
        .then(function() {
          vm.infringements.forEach(function(elem, i, array) {
            if (array[i]._id === infringement._id) {
              array.splice(i, 1);
            }
          });
          vm.glitch.setSuccess('Successfully deleted infringement');
        })
        .catch(vm.glitch.handle);
    }

    function toSettings(infringement) {
      $state.go('dashboard.infringement.settings', {
        id: infringement._id
      });
    }

    function getFewCompany() {
      vm.glitch.reset();
      dataInfringement.getFewCompany(Auth.getCurrentUser().company._id)
        .then(function(infringements) {
          vm.infringements = infringements;
        })
        .catch(vm.glitch.handle);
    }
  }
})();
