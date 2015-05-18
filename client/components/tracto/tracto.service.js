(function() {
  'use strict';

  angular
  .module('webApp')
  .service('tracto', tracto);

  tracto.$inject = [];

  function tracto() {
    this.good = '';
    this.bad = '';
    this.errors = {};
    this.handle = handle;
    this.reset = reset;

    function handle(error) {
      console.log(error);
      this.bad = 'An error has occurred. We apologize for this inconvenience.';
    }

    function reset() {
      this.good = '';
      this.bad = '';
      this.errors = {};
    }
  }
})();
