
Modialog - jQuery Plugin for modal dialogs
=

The main purpose of this plugin is to provide a way to create modal dialogs in a simple and straightforward way without resorting to jQueryUI or other, more powerful but [bigger and complex plugins]. Modialog weights only 3KB and has some unique features too :)
 
Author
-

Claudio Cicali <claudio.cicali@gmail.com>

Features
-

- **very small**, less than 5KB even when not minimized
- **callbacks**, to be added to the "close", "beforeClose" and "open" event
- **follows window resizes**, so the dialogs will always stay centered
- **offsets from origin**, so you can adapt the position of the dialog starting from the center
- **DIY**, the HTML and the CSS is all on you. Modialog only needs a DIV

Demo
-

[Demo page] with a link to open a dialog box

Usage
-

First of all you need to include the JavaScript for jQuery and this plugin.

In your layout create an hidden DIV to use as the Modialog container

    <div id="dialog"></div>

Modialog automatically injects some HTML elements in your DIV (for the caption and the close icon). You then probably need another wrapper inside the dialog (i.e.: for padding). Something like this:

    <div id="dialog"><div class="content"></div></div>

A complete dialog (with the markup added by Modialog) will then be:

    <div id="dialog">
      <div class="modialog-caption"><div class="modialog-icon"></div></div>
      <div class="content"></div>
    </div>

**Add a CSS**: a minimal CSS is really needed for the dialog to work as intended. Please take a look at the provided [demo.html] for an actual example.

Now use JavaScript to initialize the plugin and open the dialog (three examples follows)

    // Example 1: With no configuration at all
    $('#dialog').modialog();
    $('#dialog').modialog('open');

    // Example 2: Setting up a callback
    $('#dialog').modialog({
       onBeforeClose: function() {
         return confirm("Are you sure?");
       }
    });
    $('#dialog').modialog('open');

    // Example 3: Open the dialog a little higher
    $('#dialog').modialog({
       offsetTop: -100px,
       onBeforeClose: function() {
         return confirm("Are you sure?");
       }
    });
    $('#dialog').modialog('open');
    
    // Example 4: programmatically closing the dialog
    $('#dialog').modialog('close');
    
Options
-

**Important**: every callback receives "this" as the dialog itself as a jQuery object.

- **onBeforeClose**, *function*: fired just before closing the dialog. If the callback will return false, the dialog will not be closed. There is no onBeforeOpen
- **onOpen**, *function*: fired after the dialog has been opened. You can use this callback to fill the content of the dialog with an Ajax call, maybe prefilling it with a "Please wait" too
- **onClose**, *function*: fired when the dialog has been closed
- **closeWithEsc**, *boolean*: whether or not the KEY would close the dialog (default: false)
- **icon**, *string*: what to be used as the close icon. Use '' (the empty string) for no icon (default: the letter X)
- **offsetTop**, *integer*: offset in pixels from the (computed) top position of the dialog (default: 0)
- **offsetLeft**, *integer*: offset in pixels from the (computed) left position of the dialog (default: 0)

Compatibility, limits and hints
-

This plugin has been developed with (d|r)ecent browsers in mind. Anyway it works fine even in IE7.

The main purpose is to stay small, not being fancy, so there is no native support for SELECTs madness or Flash akwardness :) 

Here is a list of hints that I borrowed from Simplemodal, a [similar, bigger plugin]:

- If you experience problems with the overlay not filling the entire page, try these suggestions: If the overlay is not extending to the bottom of the page, set the body height to 100%. If there is a small, white border on the right or bottom of the page, set the margin of the body to 0px. Tips provided by Daniel Kellogg.
- In IE6, the state of checkboxes and radio buttons are not maintained using the persist option.
- In IE7, the state of radio buttons is not maintained using the persist option.
- To prevent Flash objects from "bleeding through" the dialog, make sure to set the wmode property for your object and embed elements to either opaque or transparent (reference).
- For YouTube videos (and perhaps other objects), add type="application/x-shockwave-flash" in the object tag to prevent issues in IE6. Tip provided by Jimish Shah.

License
-

Copyright (c) 2011 Claudio Cicali

Dual licensed under the MIT and GPL licenses:

  http://www.opensource.org/licenses/mit-license.php
  http://www.gnu.org/licenses/gpl.html
  
[demo.html]: http://claudioc.github.com/modialog/demo.html
[Demo page]: http://claudioc.github.com/modialog/demo.html
[similar, bigger plugin]: http://www.ericmmartin.com/projects/simplemodal/
[bigger and complex plugins]: https://itswadesh.wordpress.com/2011/04/13/15-jquery-popup-modal-dialog-plugins-and-tutorials/


