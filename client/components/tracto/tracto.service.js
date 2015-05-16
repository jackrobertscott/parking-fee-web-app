'use strict';

angular.module('webApp')
  .factory('tracto', function () {
    return {
      // message viewed on success
      good: '',

      // message viewed on error
      bad: '',

      // resource error handler
      handle: function(error) {
        console.log(error);
        this.bad = 'An error has occurred. We apologize for this inconvenience.';
      },

      // reset messages
      reset: function() {
        this.good = '';
        this.bad = '';
      }
    };
  });
