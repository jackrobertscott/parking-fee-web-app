'use strict';

$(function() {
  setTimeout(function() {
    // Maintain height of left section
    $('.left').height($('#main').height());
    // Dropdown in left section
    $('.dropdown > li').click(function() {
      $(this).parent().children('ul').slideToggle('fast');
    });
    // Dropdown in middle section
    $('.menu-labels span > li').click(function() {
      var item = $('.menu-items').get($(this).parent().index());
      $('.menu-active').removeClass('menu-active').hide('fast');
      $(item).addClass('menu-active').show('fast');
    });
  }, 500); // For some reason, will not work without this...
});
