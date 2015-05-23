(function() {
  'use strict';

  angular
  .module('webApp')
  .factory('tracto', tracto);

  tracto.$inject = [];

  function tracto() {
    var service = {
      bad: '',
      good: '',
      errors: {},
      handle: handle,
      reset: reset
    };

    return service;

    function handle(error) {
      console.log(error);
      service.bad = 'An error has occurred. We apologize for this inconvenience.';
    }

    function reset() {
      service.bad = '';
      service.good = '';
      service.errors = {};
    }
  }
})();
