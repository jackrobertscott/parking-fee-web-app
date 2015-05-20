(function() {
  'use strict';

  angular
  .module('webApp')
  .directive('sidebarResize', sidebarResize);

  function sidebarResize() {
    var directive = {
      restrict: 'A',
      link: linkFunc,
    };
    
    return directive;

    function linkFunc(scope, el, attr, ctrl) {
      scope.$watch(function () {
        elem.css({
          height: elem.parent().parent().height()
        });
      },
      function () {}, //listener
      true //deep watch
    );
  }
}
})();
