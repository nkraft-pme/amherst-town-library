(function($, Drupal) {
  'use strict';

  Drupal.behaviors.atl = {
    attach: function(context, setting) {

      // BULMA TABS
      // var tabs = $('.tabs li').each();
      // var tabContentBoxes = $('#tab-content > div').each();  
      // SITE SEASRCH CATALOG+Site TOGGLE TABS
      if ($('.tabs-1', context).length) {
        var $tabs1 = $(".tabs-1 li", context),
            $tabContentBoxes1 = $("#tab-content-1 > div", context);

        $tabs1.click(function(e) {
          $tabs1.removeClass('is-active');
          $(this).addClass('is-active');
          
          
          var $tabTarget1 = $(this).data('target');
          console.log($tabTarget1);
          // $tabContentBoxes.addClass('is-hidden');
          // $('#tab-content > div#'+$tabTarget).removeClass('is-hidden');
          $($tabContentBoxes1).each(function() {
            if ($(this).attr('id') === $tabTarget1) {
              $(this).removeClass('is-hidden');
            } else {
              $(this).addClass('is-hidden');
            }
          })
        });
      }

      // HOMEPAGE CALENDAR TABS
      if ($('.tabs-2', context).length) {
        var $tabs2 = $(".tabs-2 li", context),
            $tabContentBoxes2 = $("#tab-content-2 > div", context);

        $tabs2.click(function(e) {
          $tabs2.removeClass('is-active');
          $tabs2.find('input').prop("checked", false);
          $(this).addClass('is-active');
          $(this).find('input').prop("checked", true);
          
          
          var $tabTarget2 = $(this).data('target');
          console.log($tabTarget2);
          // $tabContentBoxes.addClass('is-hidden');
          // $('#tab-content > div#'+$tabTarget).removeClass('is-hidden');
          $($tabContentBoxes2).each(function() {
            if ($(this).attr('id') === $tabTarget2) {
              $(this).removeClass('is-hidden');
              
            } else {
              $(this).addClass('is-hidden');
            }
          })
        });
      }     
      
      // CONTENT TABS, ONLY USE ONCE PER PAGE
      if ($('.tabs-3', context).length) {
        var $tabs3 = $(".tabs-3 li", context),
            $tabContentBoxes3 = $("#tab-content-3 > div", context);

        $tabs3.click(function(e) {
          $tabs3.removeClass('is-active');
          $tabs3.find('input').prop("checked", false);
          $(this).addClass('is-active');
          $(this).find('input').prop("checked", true);
          
          
          var $tabTarget3 = $(this).data('target');
          console.log($tabTarget3);
          // $tabContentBoxes.addClass('is-hidden');
          // $('#tab-content > div#'+$tabTarget).removeClass('is-hidden');
          $($tabContentBoxes3).each(function() {
            if ($(this).attr('id') === $tabTarget3) {
              $(this).removeClass('is-hidden');
              
            } else {
              $(this).addClass('is-hidden');
            }
          })
        });
      }           


      // adds sandbox attribute to iframes
      var frames = document.getElementsByTagName('iframe');
      for (var frame of frames) {
        frame.setAttribute("sandbox", "allow-modals allow-orientation-lock allow-pointer-lock allow-presentation allow-scripts allow-same-origin allow-top-navigation allow-forms allow-popups allow-popups-to-escape-sandbox");
      }

      // Enter to Close, for divs used as close buttons, this allows enter key to act as click
      $(document).on('keyup', '.close', function(e) {
        if (e.which === 13 || e.which === 32) {
          $(this).click();
        }
      });

      // Directory - add id to headings for jump links
      $("h2.auto-id").each(function() {
        var newId = $(this).text()
          .replace('&#39;', '-')
          .replace(/[^0-9a-z-]+/gi, '-')
          .replace('--', '')
          .toLowerCase()
          .trim()
          .slice(1, -1);
        $(this).attr("id", newId);
      })

      //basic expandable content toggle not reliant on perfect markup
      $('.expand-toggle--button').unbind('click').click(function() {
        if ($(this).children('i').hasClass('fa-plus')) {
          $(this).children('i').removeClass('fa-plus').addClass('fa-minus');
        } else {
          $(this).children('i').removeClass('fa-minus').addClass('fa-plus');
        }
        $(this).toggleClass('expand-toggle--button--open').parents('.expand-toggle--container').find('.expand-toggle--content').slideToggle().toggleClass('expand-toggle--content--open');
      });
       
    }
  };


})(jQuery, Drupal);