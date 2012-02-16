HTML5 placeholder Polyfill V 1.3
================================

Lightweight and very robust little jQuery Plugin that generates the look and feel of the HTML5 placeholder attribut for Browsers without native support. It also adds an extra title in case the placeholder text is too long to be displayed. 
The polyfill comes with an option to define if the placeholder text should be read to screenreaders or not (on by default).

[check out the DEMO](http://blog.ginader.de/dev/jquery/HTML5-placeholder-polyfill/)

Thanks to Modernizr/yepnope nothing get loaded when the Browser natively supports the placeholder.

Requires:
---------

* [jQuery](http://jquery.com/) (tested with 1.6.2 but might as well work with older versions)
* [Modernizr](http://www.modernizr.com/) (tested with 2.0.6) OR [yepnope.js](http://yepnopejs.com/)

optional but recommended:

* [fontresize](http://www.tomdeater.com/jquery/onfontresize/) (excellent even though terribly unmaintained event plugin that fires when a user changes the fontsize of their Browser (that usually breaks the other placeholder polyfills))

The Placeholder Attribute has decent support across current Browsers. This Script adds support for the older generations including:

* Internet Explorer < 10
* Firefox < 4.0
* Safari < 4.0
* iOS Safari < 4.0
* Android Safari

for more details on native support see the Browser suppport table at [caniuse.com](http://caniuse.com/#search=placeholder)

USAGE:
------

### using [Modernizr](http://www.modernizr.com/)

	Modernizr.load({
	    test: Modernizr.input.placeholder,
	    nope: [
	            'libs/onfontresize.jquery.js',
	            'placeholder_polyfill.css',
	            'placeholder_polyfill.jquery.js'
	          ]
	});

### using [yepnope.js](http://yepnopejs.com/) (used as load() in Modernizr) the same but with manual feature detection

	yepnope({
	    test: ('placeholder' in $('<input>')[0]),
	    nope: [
	            'libs/onfontresize.jquery.js',
	            'placeholder_polyfill.css',
	            'placeholder_polyfill.jquery.js'
	          ]
	});