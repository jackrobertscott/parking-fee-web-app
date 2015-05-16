'use strict';

angular.module('webApp')
  .factory('locationCurator', function (Location) {
    return {
      // query for and return objects
      find: function(query, tracto) {
        query = query || {};
      },

      // find a single object
      findOne: function(id, tracto) {
      },

      // create a new object
      create: function(object, tracto) {
      },

      // update an object
      update: function(object, tracto) {
      },

      // remove/delete an object
      remove: function(object, tracto) {
      }
    };
  });
