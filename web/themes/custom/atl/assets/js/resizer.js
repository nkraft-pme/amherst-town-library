/**
 * @file
 * A JavaScript file for the theme.
 * For all your Javascript needs. For coding standards see:
 * https://www.drupal.org/docs/develop/standards/javascript/javascript-coding-standards
 * and don't forget your Behaviors:
 * https://sqndr.github.io/d8-theming-guide/javascript/behaviors.html
 * https://drupal.org/node/756722#behaviors
 */

(function(Drupal, $) {

  'use strict';
  // This handles the functionality for accordions added via paragraphs.
  Drupal.behaviors.resizer = {
    attach: function(context, settings, e) {
      $(document).ready(function(e) {
        $('.collectionResizer').each(function() {
          $(this).iFrameResize();
        });
        $('.calendarResizer').each(function() {
          $(this).iFrameResize();
        });        
        // jQuery("#collectionSpotlight43").iFrameResize();

        var setSpotlightSizing = function(iframe, OutsidePadding){
          originalWidth = jQuery(iframe).width();
          wasResized = false;
          jQuery(window).resize(function(){
            resizeSpotlightWidth(iframe, OutsidePadding);
          }).resize();
        };
        
        var resizeSpotlightWidth = function(iframe, padding){
          if (padding == undefined) padding = 4;
          var viewPortWidth = jQuery(window).width(),
            newWidth = viewPortWidth - 2*padding,
            width = jQuery(iframe).width();
          if (width > newWidth) {
            wasResized = true;
            return jQuery(iframe).width(newWidth);
          }
          if (wasResized && originalWidth + 2*padding < viewPortWidth){
            wasResized = false;
            return jQuery(iframe).width(originalWidth);
          }
        };
      });
    }
  }
  // We pass the parameters of this anonymous function are the global variables
  // that this script depend on. For example, if the above script requires
  // jQuery, you should change (Drupal) to (Drupal, jQuery) in the line below
  // and, in this file's first line of JS, change function (Drupal) to
  // (Drupal, $)
}(Drupal, jQuery));
