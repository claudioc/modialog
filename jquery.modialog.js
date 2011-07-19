
/*
* jQuery Modialog plugin 1.2
*
* Copyright (c) 2011 Claudio Cicali <claudio.cicali@gmail.com
*
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*
*/

;(function($) {

  var $overlay = null
    , defaults = {
        closeWithEsc: false
      , closeWithClick: false
      , locked: false
      , icon: 'X'
      , title: ''
      , offsetTop: 0
      , offsetLeft: 0
    }
    , $cbar
    , $icon
    , $current = null    // Remember the current opened dialog

  var methods = {
    
    init: function(settings) {
      
      settings = settings || {};

      var options = {};

      $.extend(options, defaults);
      $.extend(options, settings);

      this.data('modialogOptions', options);
      this.data('modialogContent', this.html());
      
      if (!$overlay) {
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
          close();
          return false;
        })
      }
    },
    
    set: function(overrides) {
      
      var options = this.data('modialogOptions');
      
      for (key in overrides) {
        options[key] = overrides[key];
      }
      
      this.data('modialogOptions', options);
      
    },
    
    center: function() {
      if (!this.is(':visible')) {
        return;
      }
      relocate(this);
    },

    lock: function() {
      var options = this.data('modialogOptions');
      options.locked = true;
      this.data('modialogOptions', options);
    },
    
    unlock: function() {
      var options = this.data('modialogOptions');
      options.locked = false;
      this.data('modialogOptions', options);
    },
    
    load: function(sel, url, cb) {
      
      var $dlg = this;
      
      $dlg.find(sel).load(url, function() {
        $dlg.modialog('open');
        $dlg.modialog('center')
        cb && cb.apply($dlg);
      })
      
    },
    
    open: function(cb) {
      
      var $dlg = this
        , options = this.data('modialogOptions');

      if (this.is(':visible')) {
        return;
      }
      
      if ($current) {
        close($current);
      }
      
      $current = $dlg;

      if (options.closeWithEsc) {
        $(window).bind('keypress.modialog', function(evt) {
          if (27 == evt.keyCode) {
            if (false === trigger('onBeforeClose', $dlg)) {
              return;
            }
            close($dlg);
          }
        });
      }

      $(window).bind('resize.modialog', function(evt) {
        relocate($dlg);
      });

      if (options.title != '' || options.icon != '') {
        $cbar = $('<div class="modialog-caption"/>');
        if (options.title != '') {
          $cbar.html(options.title);
        }
        $cbar.prependTo(this);
      }

      if (!options.locked && options.icon != '' && $cbar) {
        $icon = $('<div class="modialog-icon">' + options.icon + '</div>');
        $icon.appendTo($cbar).click(function() {
          if (false === trigger('onBeforeClose', $dlg)) {
            return;
          }
          close($dlg);
        });
      }

      relocate($dlg);

      this.show();
      
      cb && cb.apply($dlg);
      
      return this;
    },
    
    close: function() {
      if (this.is(':visible')) {
        close(this, true);
      }
      return this;
    }
    
  }

  function trigger(cb, $dlg) {
    var options = $dlg.data('modialogOptions');
    if ($.isFunction(options[cb])) {
      return options[cb].apply($dlg);
    }
    return null;
  }
  
  function close($dlg, force, cb) {
    if (!$dlg && !$current) {
      return;
    }

    if (!$dlg && $current) {
      
      // We use $current when clicking on the overlay
      if (!$current.data('modialogOptions').closeWithClick) {
        return;
      }
    }
    
    $dlg = $dlg ? $dlg : $current;

    var options = $dlg.data('modialogOptions');
    
    if (!force && options.locked) {
      return
    }
    
    if (options.closeWithEsc) {
      $(window).unbind('keypress.modialog');
    }
    $(window).unbind('resize.modialog');
    $overlay.hide();
    $dlg.hide();
    $dlg.html($dlg.data('modialogContent'));
    
    $current = null;
    trigger('onClose', $dlg);
    cb && cb.apply($dlg);
  }

  function relocate($dlg) {
    var options = $dlg.data('modialogOptions');
    /* Need to hide the overlay first, or the document size would be fooled */
    $overlay.hide().css({'width': $(window).width(),'height': $(window).height()}).show();
    var top = 0|($(document).scrollTop() + (($(window).height() - $dlg.height()) / 2)) + options.offsetTop;
    $dlg.css({
      'z-index': '1001',
      'position': 'absolute',
      'top': top < 0 ? 0 : top,
      'left': 0|(($(window).width() - $dlg.width()) / 2) + options.offsetLeft
    });
  }
  
  $.fn.modialog = function(method) {
    if ($.isFunction( methods[method] )) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else {
      if ($.isPlainObject(method) || typeof method == 'undefined') {
        return methods.init.apply( this, arguments );
      } else {
        $.error( 'Method ' +  method + ' does not exist on jQuery.modialog' );
      }
    }
  }

})(jQuery);

