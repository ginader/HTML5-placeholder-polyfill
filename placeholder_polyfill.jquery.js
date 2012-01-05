/**
* HTML5 placeholder polyfill
* @requires jQuery - tested with 1.4.2 but might as well work with older versions
* 
* code: https://github.com/ginader/HTML5-placeholder-polyfill
* please report issues at: https://github.com/ginader/HTML5-placeholder-polyfill/issues
*
* Copyright (c) 2012 Dirk Ginader (ginader.de)
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*
* Version: 1.1
* 
* History:
* * 1.0 initial release
* * 1.1 added support for multiline placeholders in textareas
*/

(function($) {
    var debug = false;
    function showIfEmpty(input) {
        if( $.trim(input.val()) === '' ){
            input.data('placeholder').show();
        }else{
            input.data('placeholder').hide();
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
            className: 'placeholder'
        }, config);
        return $(this).each(function() {
            var input = $(this),
                text = input.attr('placeholder'),
                id = input.attr('id'),
                label,placeholder,titleNeeded;
            if(!id){
                log('the input element with the placeholder needs an id!');
                return;
            }
            label = $('label[for="'+id+'"]');
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
                $(this).data('placeholder').hide();
            });
            input.focusout(function(){
                showIfEmpty($(this));
            });
            showIfEmpty(input);
            // optional reformat on font resize - requires: http://www.tomdeater.com/jquery/onfontresize/
            $(document).bind("fontresize", function(){
                position(placeholder,input);
            });
        });
    };
    $(function(){
        $('input[placeholder], textarea[placeholder]').placeHolder();
    });
})(jQuery);