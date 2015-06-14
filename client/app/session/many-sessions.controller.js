(function() {
  'use strict';

  angular
    .module('webApp')
    .controller('ManySessionsCtrl', ManySessionsCtrl);

  ManySessionsCtrl.$inject = ['dataSession', 'glitch', 'socket', 'Auth'];

  function ManySessionsCtrl(dataSession, glitch, socket, Auth) {
    var vm = this;

    vm.sessions = [];
    vm.glitch = glitch;
    vm.getMany = getMany;
    vm.remove = remove;
    vm.getFewUser = getFewUser;

    ////////////

    activate();

    function activate() {
      // code...
    }

    ////////////

    function getMany() {
      vm.glitch.reset();
      dataSession.getMany()
        .then(function(sessions) {
          vm.sessions = sessions;
        })
        .catch(vm.glitch.handle);
    }

    function remove(session) {
      vm.glitch.reset();
      dataSession.remove(session)
        .then(function() {
          vm.sessions.forEach(function(elem, i, array) {
            if (array[i]._id === session._id) {
              array.splice(i, 1);
            }
          });
          vm.glitch.setSuccess('Successfully deleted session');
        })
        .catch(vm.glitch.handle);
    }

    function getFewUser() {
      vm.glitch.reset();
      dataSession.getFewUser(Auth.getCurrentUser()._id)
        .then(function(sessions) {
          vm.sessions = sessions;
        })
        .catch(vm.glitch.handle);
    }
  }
})();
