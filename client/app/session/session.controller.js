(function() {
  'use strict';

  angular
    .module('webApp')
    .controller('SessionCtrl', SessionCtrl);

  SessionCtrl.$inject = ['dataSession', 'glitch', 'socket', 'Auth', '$state'];

  function SessionCtrl(dataSession, glitch, socket, Auth, $state) {
    var vm = this;

    vm.session = {};
    vm.sessions = [];
    vm.submitted = false;
    vm.glitch = glitch;
    vm.getMany = getMany;
    vm.getFewUser = getFewUser;
    vm.getOne = getOne;
    vm.create = create;
    vm.update = update;
    // vm.remove = remove;

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

    function getFewUser() {
      vm.glitch.reset();
      dataSession.getFewUser(Auth.getCurrentUser()._id)
        .then(function(sessions) {
          vm.sessions = sessions;
        })
        .catch(vm.glitch.handle);
    }

    function getOne(id) {
      vm.glitch.reset();
      dataSession.getOne(id)
        .then(function(session) {
          vm.session = session;
        })
        .catch(vm.glitch.handle);
    }

    function create(form) {
      vm.glitch.reset();
      vm.submitted = true;
      if (!form.$valid) {
        invalid();
      } else {
        dataSession.create(vm.session)
          .then(function(session) {
            $state.go('session');
          })
          .catch(vm.glitch.handle);
      }
    }

    function update(form) {
      vm.glitch.reset();
      vm.submitted = true;
      if (!form.$valid) {
        invalid();
      } else {
        dataSession.update(vm.session)
          .then(function(session) {
            vm.glitch.setSuccess('Successfully updated');
          })
          .catch(vm.glitch.handle);
      }
    }

    // function remove(session) {
    //   vm.glitch.reset();
    //   dataSession.remove(session)
    //     .then(function() {
    //       vm.sessions.forEach(function(elem, i, array) {
    //         if (array[i]._id === session._id) {
    //           array.splice(i, 1);
    //         }
    //       });
    //       vm.glitch.setSuccess('Successfully deleted session');
    //     })
    //     .catch(vm.glitch.handle);
    // }
    //
    // function remove(form) {
    //   vm.glitch.reset();
    //   if (!form.$valid) {
    //     invalid();
    //   } else {
    //     dataSession.remove(vm.session)
    //       .then(function() {
    //         vm.session = {};
    //         $state.go('session');
    //       })
    //       .catch(vm.glitch.handle);
    //   }
    // }

    function invalid() {
      vm.submitted = true;
      vm.glitch.setError('Form is invalid');
    }
  }
})();
