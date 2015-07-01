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
        scope.ngImageModel = [];
        for (var i = 0; i < changeEvent.target.files.length; i++) {
          var c = document.createElement('canvas');
          var ctx = c.getContext('2d');
          var reader = new FileReader();

          reader.onload = function(event) {
            var img = new Image();
            img.src = event.target.result;

            var MAX_WIDTH = 800;
            var MAX_HEIGHT = 600;
            var width = img.width;
            var height = img.height;

            if (width > height) {
              if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
              }
            } else {
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
              }
            }
            c.width = width;
            c.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            scope.$apply(function() {
              scope.ngImageModel.push(c.toDataURL('image/png'));
            });
          };

          reader.readAsDataURL(changeEvent.target.files[i]);
        }
      });
    }
  }
})();
