(function() {
  'use strict';

  angular
  .module('webApp')
  .directive('mongooseError', mongooseError);

  function mongooseError() {
    var directive = {
      restrict: 'A',
      require: 'ngModel',
      link: linkFunc,
    };

    return directive;

    function linkFunc(scope, element, attrs, ngModel) {
      element.on('keydown', function() {
        return ngModel.$setValidity('mongoose', true);
      });
    }
  }
})();
