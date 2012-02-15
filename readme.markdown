HTML5 placeholder Polyfill V 1.3
================================

Lightweight and very robust little jQuery Plugin that generates the look and feel of the HTML5 placeholder attribut for Browsers without native support. It also adds an extra title in case the placeholder text is too long to be displayed. 
The polyfill comes with an option to define if the placegolder text should be read to screenreaders or not (on by default).

Thanks to Modernizr/yepnope nothing get loaded when the Browser natively supports the placeholder.

requires:

* [jQuery](http://jquery.com/) (tested with 1.4.2 but might as well work with older versions)
* [Modernizr](http://www.modernizr.com/) (tested with 2.0.6)

optional but recommended:

* [fontresize](http://www.tomdeater.com/jquery/onfontresize/) (excellent even though terribly unmaintained event plugin that fires when a user changes the fontsize of their Browser (that usually breaks the other placeholder polyfills))

[check out the DEMO](http://blog.ginader.de/dev/jquery/HTML5-placeholder-polyfill/)

The Placeholder Attribute has decent support across current Browsers. This Script adds support for the older generations including:

* Internet Explorer < 10
* Firefox < 4.0
* Safari < 4.0
* iOS Safari < 4.0
* Android Safari

for more details on native support see the Browser suppport table at [caniuse.com](http://caniuse.com/#search=placeholder)