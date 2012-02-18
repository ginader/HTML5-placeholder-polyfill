HTML5 placeholder Polyfill
==========================

Lightweight and very robust little jQuery Plugin that generates the look and feel of the HTML5 placeholder attribut for Browsers without native support. It also adds an extra title in case the placeholder text is too long to be displayed. 
The polyfill comes with an option to define if the placeholder text should be read to screenreaders or not (on by default).

* __[check out the DEMO](http://blog.ginader.de/dev/jquery/HTML5-placeholder-polyfill/)__
* __[check out the DEMO using Modernizr to load the Polyfill](http://blog.ginader.de/dev/jquery/HTML5-placeholder-polyfill/index-modernizr.html)__ (Thanks to Modernizr/yepnope nothing needs to get loaded when the Browser natively supports the placeholder)


Requires:
---------

* [jQuery](http://jquery.com/) (tested with 1.6.2 but might as well work with older versions)
* [Modernizr](http://www.modernizr.com/) (tested with 2.0.6) OR [yepnope.js](http://yepnopejs.com/)

optional but recommended:

* [fontresize](https://github.com/johnantoni/jquery.onfontresize) (excellent even though terribly unmaintained event plugin that fires when a user changes the fontsize of their Browser (that usually breaks the other placeholder polyfills))

highly optional (only needed if you want users to be able to resize textareas):

* [jquery-resize](https://github.com/cowboy/jquery-resize) if included a repositioning is triggered when a user resizes a textarea. If not I disable the resizing of textareas to avoid rendering problems

The Placeholder Attribute has decent support across current Browsers. This Script adds support for the older generations including:

* Internet Explorer < 10
* Firefox < 4.0
* Safari < 4.0
* iOS Safari < 4.0
* Android Safari

for more details on native support see the Browser suppport table at [caniuse.com](http://caniuse.com/#search=placeholder)

USAGE:
------

### Simply include the Javascript and CSS. The Polyfill will only run when needed

	<head>
		<link rel="stylesheet" href="placeholder_polyfill.min.css">
		<script src="placeholder_polyfill.jquery.min.combo.js" charset="utf-8"></script>
	</head>

### using [Modernizr](http://www.modernizr.com/) modern Browser don't even have to load the Polyfill at all

	Modernizr.load({
	    test: Modernizr.input.placeholder,
	    nope: [
				'placeholder_polyfill.min.css',
				'placeholder_polyfill.jquery.min.combo.js'
	          ]
	});

### using [yepnope.js](http://yepnopejs.com/) (used as load() in Modernizr) the same as with Modernizr but with manual feature detection

	yepnope({
	    test: ('placeholder' in $('<input>')[0]),
	    nope: [
                'placeholder_polyfill.min.css',
                'placeholder_polyfill.jquery.min.combo.js'
	          ]
	});
