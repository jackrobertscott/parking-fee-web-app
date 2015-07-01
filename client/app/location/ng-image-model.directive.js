(function() {
  'use strict';

  angular
    .module('webApp')
    .directive('ngImageModel', ngImageModel);

  function ngImageModel() {
    var directive = {
      restrict: 'EA',
      scope: {
        ngImageModel: '='
      },
      link: linkFunc
    };

    return directive;

    function linkFunc(scope, el, attr, ctrl) {
      el.bind('change', function(changeEvent) {
        var reader = new FileReader();
        reader.onload = function(loadEvent) {
          scope.$apply(function() {
            scope.ngImageModel = loadEvent.target.result;
          });
        };
        reader.readAsDataURL(changeEvent.target.files[0]);
      });
    }
  }
})();
