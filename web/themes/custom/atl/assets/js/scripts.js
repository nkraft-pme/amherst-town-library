(function($, Drupal) {
  'use strict';

  Drupal.behaviors.atl = {
    attach: function(context, setting) {
      //basic toggle class for hiding the facet filters. Could be used anywhere. Fixed height using max-height method
      $('button.toggle-trigger-fh', context).click(function() {
        var $parent = $(this).parent().parent(); //var $parent = $(this).parent('div'); //facet button enclosed in a span for ios support

        $parent.toggleClass('toggle-trigger-fh-expanded');
        $('button.toggle-trigger-fh').text(($parent.hasClass('toggle-trigger-fh-expanded') ? 'Hide Filters' : 'Filter Results'));
      });

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

      //live search on facet blocks with a show/hide button, could be used in other places.
      if ($('.block-facets', context)) {
        //hide show more if list isn't long enough
        var filterContainer = '.block-facets--category-search',
          expandTrigger = '.facets-search-limit-link',
          filterItem = '.facet-item',
          filterHeight = $(filterContainer, context).innerHeight();

        if (filterHeight < 340) {
          $(filterContainer + ' ' + expandTrigger, context).hide();
          $(filterContainer, context).addClass('toggle-trigger-fh-expanded');
        }

        //css class added using block class
        $('.js-element--live-filter', context).on('keyup', function() {
          //remove expand/collapse button. Specific to Diseases and Conditions in Search
          $(filterContainer + ' ' + expandTrigger, context).hide();
          $(filterContainer, context).addClass('toggle-trigger-fh-expanded');

          //search and partial match is case sensitive. this section is best suited to convert into a reusable function
          var liveFilter = $(this).val().toLowerCase(),
            liveFilterParent = $(filterContainer + ' ' + filterItem + 'label span', context);

          liveFilterParent.each(function() {

            var facetItem = $(this),
              facetItemText = facetItem.text().toLowerCase();

            facetItem.parents(filterItem).hide();

            if (facetItemText.match(liveFilter)) {
              facetItem.parents(filterItem).show();
            }
          });
        });
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

      if (window.location.href.indexOf("p2b2") > -1) {
        $('a.feed-icon').addClass('button').removeClass('feed-icon').text('Download').css('margin-right', '0').insertAfter($('#edit-submit-organization-list'))
      }
      //basic expandable content toggle not reliant on perfect markup
      $('.expand-toggle--button').unbind('click').click(function() {
        if ($(this).children('i').hasClass('fa-plus')) {
          $(this).children('i').removeClass('fa-plus').addClass('fa-minus');
        } else {
          $(this).children('i').removeClass('fa-minus').addClass('fa-plus');
        }
        $(this).toggleClass('expand-toggle--button--open').parents('.expand-toggle--container').find('.expand-toggle--content').slideToggle().toggleClass('expand-toggle--content--open');
      });

      // Add IDs for tracking of downloads (top or bottom link location)
      $(".dropdown-item a").each(function() {
        $(this).addClass('download-top');
      });

      $(".link-card--link a").each(function() {
        $(this).addClass('download-bottom');
      });

      // for adding label attribute to acquia search exposed form
      if ($(".block-views-exposed-filter-blockacquia-search-page-content")) {
        $("#edit-search").attr("aria-label", "Enter search term");
        $("#edit-submit-acquia-search").attr("aria-label", "Submit");
      }

      if ($("imagebg-card-grantsearch")) {
        $("#search-grants").attr("aria-label", "Search grants");
      }

      // atl Media Libarary Search default show extra filters
      if($('#edit-reset').is(':visible')){
        $('#hidden-filters').show();
        $('#show-extra-filters').toggleClass('expanded');
      }

      // atl Media Library toggle extra filters
      $('#show-extra-filters').click(function() {
        $('#hidden-filters').slideToggle("slow", function(){});
        $('#show-extra-filters').toggleClass('expanded');
      });
       
      // Lab taxonomy link hijack
      // first see if url contains lab pattern
      if (window.location.href.indexOf("/labs/") > -1 ){
        // making sure class taxonomy class exisist
        if ($('.irpLabGroups')[0]){
          // Function locates each ahref, reads text inside and replaces url with tax term name
          $('.irpLabGroups' ).find('a').each(function(){
            var taxterm = $(this).text().toLowerCase().trim().replace(/ /g, '-');
            $(this).attr('href', '/labs/research-areas#'+taxterm)
          }) 
        }
      }
      // end lab taxonomy link hijack

      // Remove page title if hero banner has page title in it
      if($('.featured-hero--title')[0]){
        $('#block-pagetitle').hide();
      }

    }
  };





  Drupal.behaviors.intranet_link = {
    attach: function(context, settings) {

      // If this particular div with this ID does not existthen append this empty div.
      if (!$('div#block-footerpolicylinks div#is').length) {
        $('div#block-footerpolicylinks').append('<div id="is" class="is"></div>');
      }
      // This php file is then loaded into the empty div if IP address is whitelisted.
      $('div#block-footerpolicylinks div#is').load('/is.php');
    }
  }

})(jQuery, Drupal);