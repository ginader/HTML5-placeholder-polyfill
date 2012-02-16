/**
* HTML5 placeholder polyfill
* @requires jQuery - tested with 1.6.2 but might as well work with older versions
* 
* code: https://github.com/ginader/HTML5-placeholder-polyfill
* please report issues at: https://github.com/ginader/HTML5-placeholder-polyfill/issues
*
* Copyright (c) 2012 Dirk Ginader (ginader.de)
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*
* Version: 1.3
* 
* History:
* * 1.0 initial release
* * 1.1 added support for multiline placeholders in textareas
* * 1.2 Allow label to wrap the input element by noah https://github.com/ginader/HTML5-placeholder-polyfill/pull/1
* * 1.3 New option to read placeholder to Screenreaders. Turned on by default
*/

(function($) {
    var debug = false;
    function showIfEmpty(input,options) {
        if( $.trim(input.val()) === '' ){
            input.data('placeholder').removeClass(options.hideClass);
        }else{
            input.data('placeholder').addClass(options.hideClass);
        }
    }
    function position(placeholder,input){
        var pos = input.position(),
            ta = input.is('textarea');
        placeholder.css({
            left : pos.left,
            top : pos.top,
            width : input.innerWidth()-(ta ? 20 : 4),
            height : input.innerHeight()-6,
            lineHeight : input.css('line-height'),
            whiteSpace : ta ? 'normal' : 'nowrap',
            overflow : 'hidden'
        });
    }
    function log(msg){
        if(debug && window.console && window.console.log){
            window.console.log(msg);
        }
    }
    $.fn.placeHolder = function(config) {
        var o = this;
        this.options = $.extend({
            className: 'placeholder',
            visibleToScreenreaders : true,
            visibleToScreenreadersHideClass : 'placeholder-hide-exept-screenreader',
            visibleToNoneHideClass : 'placeholder-hide'

        }, config);
        this.options.hideClass = this.options.visibleToScreenreaders ? this.options.visibleToScreenreadersHideClass : this.options.visibleToNoneHideClass;
        return $(this).each(function() {
            var input = $(this),
                text = input.attr('placeholder'),
                id = input.attr('id'),
                label,placeholder,titleNeeded;
            label = input.closest('label')[0];
            if(!label && !id){
                log('the input element with the placeholder needs an id!');
                return;
            }
            label = label || $('label[for="'+id+'"]');
            if(!label){
                log('the input element with the placeholder needs a label!');
                return;
            }
            placeholder = $('<span class="'+o.options.className+'">'+text+'</span>').appendTo(label);
            titleNeeded = (placeholder.width() > input.width());
            if(titleNeeded){
                placeholder.attr('title',text);
            }
            position(placeholder,input);
            input.data('placeholder',placeholder);
            placeholder.data('input',placeholder);
            placeholder.click(function(){
                $(this).data('input').focus();
            });
            input.focusin(function() {
                $(this).data('placeholder').addClass(o.options.hideClass);
            });
            input.focusout(function(){
                showIfEmpty($(this),o.options);
            });
            showIfEmpty(input,o.options);
            // optional reformat on font resize - requires: http://www.tomdeater.com/jquery/onfontresize/
            $(document).bind("fontresize", function(){
                position(placeholder,input);
            });
        });
    };
    $(function(){
        $('input[placeholder], textarea[placeholder]').placeHolder({
            visibleToScreenreaders : true
        });
    });
})(jQuery);