
/*
* jQuery Modialog plugin 1.0
*
* Copyright (c) 2011 Claudio Cicali <claudio.cicali@gmail.com
*
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*
*/

;(function($) {

  var $overlay
    , options = {
        // Close the dialog with the ESC key?
        closeWithEsc: false
      , icon: 'X'
      , offsetTop: 0
      , offsetLeft: 0
    }
    , $cbar
    , $icon
    , haveChrome = false;

  var methods = {
    
    init: function(settings) {
      
      $cbar = $('<div class="modialog-caption"/>');
      $icon = $('<div class="modialog-icon">' + options.icon + '</div>');
      
      settings = settings || {};

      $.extend(options, settings);

      /* Create an overlay to use as matte */
      $overlay = $('<div/>').css({
          'display': 'none'
        , 'position': 'fixed'
        , 'top': 0
        , 'left': 0
        , 'opacity': 0.6
        , 'z-index': '1000'
      })
      .addClass('modialog-overlay')
      .appendTo('body')
      .click(function(e) {
        e.stopPropagation();
        e.preventDefault();
        return false;
      })
    },
    
    open: function() {
      
      var $dlg = this;
      
      if (this.is(':visible')) {
        return;
      }

      if (options.closeWithEsc) {
        $(window).bind('keypress.modialog', function(evt) {
          if (27 == evt.keyCode) {
            if (false === trigger('onBeforeClose')) {
              return;
            }
            close($dlg);
          }
        });
      }

      $(window).bind('resize.modialog', function(evt) {
        relocate($dlg);
      });

      if (!haveChrome) {
        /* Create the title bar */
        $cbar.prependTo(this);
        $icon.appendTo($cbar).click(function() {
          if (false === trigger('onBeforeClose')) {
            return;
          }
          close($dlg);
        });
        haveChrome = true;
      }

      relocate($dlg);

      this.show();
      
      trigger('onOpen', this);
      
      return this;
    },
    
    close: function() {
      if (this.is(':visible')) {
        close(this);
      }
      return this;
    }
    
  }

  function trigger(cb, $dlg) {
    if ($.isFunction(options[cb])) {
      return options[cb].apply($dlg);
    }
    return null;
  }
  
  function close($dlg) {
    if (options.closeWithEsc) {
      $(window).unbind('keypress.modialog');
    }
    $(window).unbind('resize.modialog');
    $overlay.hide();
    $dlg.hide();
    trigger('onClose', $dlg);
  }

  function relocate($dlg) {
    /* Need to hide the overlay first, or the document size would be fooled */
    $overlay.hide().css({'width': $(window).width(),'height': $(window).height()}).show();
    $dlg.css({
      'z-index': '1001',
      'position': 'absolute',
      'top': 0|($(document).scrollTop() + (($(window).height() - $dlg.height()) / 2)) + options.offsetTop,
      'left': 0|(($(window).width() - $dlg.width()) / 2) + options.offsetLeft
    });
  }
  
  $.fn.modialog = function(method) {
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || !method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.modialog' );
    }
  }

})(jQuery);

