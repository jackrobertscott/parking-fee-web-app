'use strict';

angular.module('webApp')
  .directive('sidebarResize', function () {
    return {
      restrict: 'A',
      link: function(scope, elem, attrs) {
        scope.$watch(function () {
          elem.css({
            height: elem.parent().parent().height()
          });
        },
        function () {}, //listener
        true //deep watch
        );
      }
    };
  });
