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
  Drupal.behaviors.paragraph_accordions = {
    attach: function(context, settings, e) {

      Drupal.t('Collapse All')
      $(document).ready(function(e) {

        /*  Prepare page before any accordion items are clicked. */
        // If iq-accordion exists
        if ($('.iq-accordion', context).length) {
          // Set a unique ID for each accordion heading.
          var $accordionHeader = $('.iq-accordion .iq-accordion--heading', context);
          $accordionHeader.attr('id', function(index) {
            if ($(this).attr('id') == '') {
              return 'topic-' + (index + 1);
            } else {
              //do nothing
            }
          });

          // Hide accordion item contents with JS instead of CSS so that it will
          // be visible if JS is turned off (508).
          $('.iq-accordion').find('.iq-accordion--content').not( '.hansolo' ).hide();

          // Set the URL's hash to a var and trigger a click.
          var urlHash = window.location.hash;
          if (urlHash) {
            var idFromURL = urlHash.substring(1);
            var $openID = $('#' + idFromURL);
            
            //add delay to grab correct positioning of elements for page scroll
            if (!$openID.hasClass('hansolo')) {
              $openID.addClass('hansolo');
              setTimeout(function(f) {
                $openID.delay(1000).trigger( "click" );
                console.log('open hash 1400');
              }, 1000)
            }

          }
        }
        
      });

      /* Execute this code when an accordion item is clicked. */
      // When accordion heading is clicked, open the accordion, display its content.
      $('.iq-accordion--heading').unbind().click(function() { clickAccordion(this) });

      $('.topic-intro a').add('.paragraph--type--accordion .iq-accordion--content a').click(function(e) {
        if($(this).attr('href')[0]==='#') {
          let link = $(this).attr('href')
          if($(this).attr('href')=== '#ref') link = '#references';

          if(!$(link).hasClass('active')) {
            $(link).trigger("click");
          }

          e.preventDefault();
          // $('html,body').animate({scrollTop: $('button'+link).offset().top},50);
          $('html,body').animate({scrollTop: ($('button'+link).offset().top) - 20}, 500)
          window.location.hash = link;
        }
      })

      // Clicking functionality
      var clickAccordion = function(ctrl) {
        // Keep track of what items are opened via active class
        if ($(ctrl).hasClass('active')) {
          closeAccordion(ctrl);
        } else {
          openAccordion(ctrl);
          // Add delay to page scroll to ensure correct element positioning
          // $('html, body').delay(400).animate({ scrollTop: ($(ctrl).offset().top) - 10 }, 100);
        };
      }

      // Accordion opening functionality
      var openAccordion = function(selected, e) {
        // Track expanded status
        if (!$(selected).hasClass('active')) $(selected).addClass('active');
        // Aria handling for 508 + Slide down the contents under the heading that was clicked.
        $(selected).attr('aria-expanded', 'true').next('.iq-accordion--content').attr('aria-hidden', 'false').slideDown(300, 'swing');
        // Change the icon.
        $(selected).children('.iq-accordion--toggle').removeClass('closed').addClass('open');
        $(selected).children('.iq-accordion--toggle').children('ion-icon').attr('name', 'caret-up');
        

        // Add hash to URL of the heading that was clicked.
        if (history.pushState) {
          history.replaceState(null, null, "#" + $(selected).attr('id'));
        } else {
          window.location.hash = $(selected).attr('id');
          e.preventdefault();
        }
      }

      //Accordion closing functionality
      var closeAccordion = function(selected, e) {
        $(selected).removeClass('active').attr('aria-expanded', 'false').next('.iq-accordion--content').attr('aria-hidden', 'true').slideUp(300, 'swing');
        $(selected).children('.iq-accordion--toggle').removeClass('open').addClass('closed');
        $(selected).children('.iq-accordion--toggle').children('ion-icon').attr('name', 'caret-down');
        // Remove hash from URL.
        if (document.location.hash) history.replaceState('', document.title, window.location.pathname);
      }
      // Adds the ability to hit enter on focus to fire the button click.

      // Expand All/ Collapse All functionality
      $('.expand').unbind().click(function() {
        if ($(this).hasClass('expanded')) {
          $(this).removeClass('expanded');
          $('.iq-accordion--heading').each(function() {
            closeAccordion($(this));
          });
          ($(this).text() === "Collapse All") ? $(this).text('Expand All'): $(this).text('Expandir');
          if (document.location.hash) history.replaceState('', document.title, window.location.pathname);
        } else {
          $(this).addClass('expanded');
          $('.iq-accordion--heading').each(function() {
            openAccordion($(this));
            if (document.location.hash) history.replaceState('', document.title, window.location.pathname);
          });
          ($(this).text() === "Expand All") ? $(this).text('Collapse All'): $(this).text('Contraer');
        }
      })
    }
  }
  $('.iq-accordion .iq-accordion--heading').keypress(function (j) {
   var key = j.which;
   if(key == 13)  // the enter key code
    {
      //$(this).click();
      $(this).trigger("click");
      return false;
    }
  });

}(Drupal, jQuery));
