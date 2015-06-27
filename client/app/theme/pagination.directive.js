(function() {
  'use strict';

  angular
    .module('webApp')
    .directive('pagination', pagination);

  function pagination() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'app/theme/pagination.directive.html',
      transclude: true,
      scope: {
        length: '=',
        begin: '=',
        limit: '='
      },
      link: linkFunc,
    };

    return directive;

    function linkFunc(scope, el, attr, ctrl) {
      scope.begin = scope.begin || 0;
      scope.limit = scope.limit || 20;
      scope.increment = increment;
      scope.decrement = decrement;
      scope.jump = jump;
      scope.getNumber = getNumber;

      function increment(length) {
        if (!length || scope.begin + scope.limit < length) {
          scope.begin += scope.limit;
        }
      }

      function decrement() {
        if (scope.begin - scope.limit >= 0) {
          scope.begin -= scope.limit;
        }
      }

      function jump(step) {
        scope.begin = scope.limit * step;
      }

      function getNumber(number) {
        return new Array(Math.ceil(number));
      }
    }
  }
})();
