HTML5 placeholder Polyfill
==========================

Lightweight and very robust little jQuery plugin that generates the look and feel of the HTML5 placeholder attribute for browsers without native support. It also adds an extra title in case the placeholder text is too long to be displayed. 
The polyfill comes with an option to define if the placeholder text should be read to screenreaders or not (on by default). New in version 1.9 is the option to make it behave like Chrome or mobile Safari (hide placeholder when the users enters content rather than when the fields receives focus).

Demos:
------
__To see the actual work of this polyfill use an old browser like Firefox 3.6!__

* __[check out the DEMO](http://blog.ginader.de/dev/jquery/HTML5-placeholder-polyfill/docs/)__
* __[check out the Chrome style DEMO](http://blog.ginader.de/dev/jquery/HTML5-placeholder-polyfill/docs/index-chromeish.html)__
* __[check out the DEMO using Modernizr to load the Polyfill](http://blog.ginader.de/dev/jquery/HTML5-placeholder-polyfill/docs/index-modernizr.html)__ (Thanks to Modernizr/yepnope nothing needs to get loaded when the Browser natively supports the placeholder)


Requires:
---------

* [jQuery](http://jquery.com/) (tested with 1.6.2 but might as well work with older versions)
* [Modernizr](http://www.modernizr.com/) (tested with 2.0.6) OR [yepnope.js](http://yepnopejs.com/)

Optional but recommended:

* [fontresize](https://github.com/johnantoni/jquery.onfontresize) (excellent even though terribly unmaintained event plugin that fires when a user changes the font size of their browser (that usually breaks the other placeholder polyfills))

Highly optional (only needed if you want users to be able to resize textareas):

* [jquery-resize](https://github.com/cowboy/jquery-resize) if included a repositioning is triggered when a user resizes a textarea. If not I disable the resizing of textareas to avoid rendering problems

Required only if hiding placeholder when user types instead of onfocus like Chrome or mobile Safari:

* [requestAnimationFrame polyfill](https://gist.github.com/1579671) better than a simple timeout loop as browsers can slow the loop down when it's not the active window

The placeholder attribute has decent support across current Browsers. This script adds support for the older generations including:

* Internet Explorer < 10
* Firefox < 4.0
* Safari < 4.0
* iOS Safari < 4.0
* Android Browser < 2.0

For more details on native support see the browser suppport table at [caniuse.com](http://caniuse.com/#search=placeholder).

USAGE:
------

### Simply include the Javascript and CSS. The Polyfill will only run when needed.

	<head>
		<link rel="stylesheet" href="placeholder_polyfill.min.css">
		<script src="placeholder_polyfill.jquery.min.combo.js" charset="utf-8"></script>
	</head>

Please bear in mind that every input needs a linked label in order for the plugin to work.

### Using [Modernizr](http://www.modernizr.com/), modern browser don't even have to load the polyfill at all.

	<script>
	Modernizr.load({
	    test: Modernizr.input.placeholder,
	    nope: [
				'placeholder_polyfill.min.css',
				'placeholder_polyfill.jquery.min.combo.js'
	          ]
	});
	</script>

### Using [yepnope.js](http://yepnopejs.com/) (used as load() in Modernizr), the same as with Modernizr, but with manual feature detection.

	<script>
	yepnope({
	    test: ('placeholder' in $('<input>')[0]),
	    nope: [
                'placeholder_polyfill.min.css',
                'placeholder_polyfill.jquery.min.combo.js'
	          ]
	});
	</script>

### Configuring the behavior (optional)

	<head>
		<link rel="stylesheet" href="placeholder_polyfill.min.css">
		<script>
    	placeHolderConfig = {
    		// css class that is used to style the placeholder
            	className: 'placeholder', 
            // expose the placeholder text to screenreaders or not
	            visibleToScreenreaders : true,
	        // css class is used to visually hide the placeholder
		        visibleToScreenreadersHideClass : 'placeholder-hide-except-screenreader', 
		    // css class used to hide the placeholder for all
	            visibleToNoneHideClass : 'placeholder-hide',
            // either hide the placeholder on focus or on type
	            hideOnFocus : false, 
            // remove this class from a label (to fix hidden labels)
	            removeLabelClass : 'visuallyhidden', 
	        // replace the label above with this class
	            hiddenOverrideClass : 'visuallyhidden-with-placeholder', 
            // allow the replace of the removeLabelClass with hiddenOverrideClass or not
	            forceHiddenOverride : true, 
            // apply the polyfill even for browser with native support
	            forceApply : false, 
            // init automatically or not
            	autoInit : true 
    	}
    	</script> 
		<script src="placeholder_polyfill.jquery.min.combo.js" charset="utf-8"></script>
	</head>	