'use strict';

angular.module('webApp')
  .directive('jqRun', function () {
    return {
      restrict: 'A',
      link: function($scope, element, attrs) {
        // Trigger when number of children changes,
        // including by directives like ng-repeat
        var watch = $scope.$watch(function() {
          return element.children().length;
        }, function() {
          // Wait for templates to render
          $scope.$evalAsync(function() {
            // Finally, directives are evaluated
            // and templates are renderer here

            $(function() {
              // Maintain height of left section
              $('.left').height($('#main').height());
              // Dropdown in left section
              $('.dropdown > li').click(function() {
                $(this).parent().children('ul').slideToggle('fast');
              });
              // Dropdown in middle section
              $('.menu-labels span > li').click(function() {
                var index = $(this).parent().index();
                var dropdown = $('.menu-items').get(index);
                $('.menu-active').removeClass('menu-active').hide('fast');
                $(dropdown).addClass('menu-active').show('fast');
              });
            });

          });
        });
      },
    };
  });
