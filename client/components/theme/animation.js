'use strict';

// Maintain height of left section
$('.left').height($('#main').height());
// Dropdown in left section
$('.dropdown > a').click(function() {
  $(this).parent().children('ul').slideToggle('fast');
});
// Dropdown in middle section
$('.menu-labels > a').click(function() {
  var item = $('.menu-items').get($(this).index());
  $('.menu-active').removeClass('menu-active').hide('fast');
  $(item).addClass('menu-active').show('fast');
});
