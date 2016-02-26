History:
========
* 1.0 initial release
* 1.1 added support for multiline placeholders in textareas
* 1.2 Allow label to wrap the input element by noah https://github.com/ginader/HTML5-placeholder-polyfill/pull/1
* 1.3 New option to read placeholder to Screenreaders. Turned on by default
* 1.4 made placeholder more robust to allow labels being offscreen + added minified version of the 3rd party libs
* 1.5 emptying the native placeholder to prevent double rendering in Browsers with partial support
* 1.6 optional reformat when a textarea is being resized - requires http://benalman.com/projects/jquery-resize-plugin/
* 1.7 feature detection is now included in the polyfill so you can simply include it without the need for Modernizr
* 1.8 replacing the HTML5 Boilerplate .visuallyhidden technique with one that still allows the placeholder to be rendered
* 1.8.1 bugfix for implicit labels
* 1.9 New option "hideOnFocus" which, if set to false will mimic the behavior of mobile safari and chrome (remove label when typed instead of onfocus)
* 1.9.1 added reformat event on window resize
* 1.9.2 more flexible way to "fix" labels that are hidden using clip() thanks to grahambates: https://github.com/ginader/HTML5-placeholder-polyfill/issues/12
* 2.0 new easier configuration technique and new options forceApply and AutoInit and support for setters and getters
* 2.0.1 changed check for empty field so a space character is no longer ignored
* 2.0.2 allow rerun of the placeholder() to cover generated elements - existing polyfilled placeholder will be repositioned. Fixing: https://github.com/ginader/HTML5-placeholder-polyfill/issues/15
* 2.0.3 turn debugging of for production. fix https://github.com/ginader/HTML5-placeholder-polyfill/issues/18
* 2.0.4 moved to grunt as build tool and restructured the project
* 2.0.5 added markdown conversion
* 2.0.6 fix for issue https://github.com/ginader/HTML5-placeholder-polyfill/pull/23 - thanks to christiangeek
* 2.0.7 fix for issue https://github.com/ginader/HTML5-placeholder-polyfill/pull/44 - thanks to randallb for the report
* 2.0.8 added Bower config
* 2.0.9 fix for issue https://github.com/ginader/HTML5-placeholder-polyfill/pull/58 - thanks to samuelcole for the commit
* 2.1 added support for :placeholder-shown https://github.com/ginader/HTML5-placeholder-polyfill/issues/71 - thanks to corysimmons for the suggestion