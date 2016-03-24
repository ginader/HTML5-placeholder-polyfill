/**
* HTML5 placeholder polyfill
* @requires jQuery - tested with 1.6.2 but might as well work with older versions
*
* code: https://github.com/ginader/HTML5-placeholder-polyfill
* please report issues at: https://github.com/ginader/HTML5-placeholder-polyfill/issues
*
* Copyright (c) 2016 Dirk Ginader (ginader.de)
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*
*/

(function($) {
    var debug = false,
        animId;
    function showPlaceholderIfEmpty(input,options) {
        if( input.val() === '' ){
            input.data('placeholder').removeClass(options.hideClass);
            input.addClass(options.placeholderShownClass);
        }else{
            input.data('placeholder').addClass(options.hideClass);
            input.removeClass(options.placeholderShownClass);
        }
    }
    function hidePlaceholder(input,options){
        input.data('placeholder').addClass(options.hideClass);
        input.removeClass(options.placeholderShownClass);
    }
    function positionPlaceholder(placeholder,input){
        var ta  = input.is('textarea');

        placeholder.css({
            width : input.innerWidth()-(ta ? 20 : 4),
            height : ta ? input.innerHeight() - 6 : 'auto',
            lineHeight : input.css('line-height'),
            whiteSpace : ta ? 'normal' : 'nowrap',
            overflow : 'hidden'
        })

        var top = parseInt((input.outerHeight() / 2) - (placeholder.outerHeight() / 2));
        var left = parseFloat(input.css('padding-left'));
        var offset = input.offset();
        if (top) {
            offset.top += top;
        }
        if (left) {
            offset.left += left;
        }
        placeholder.offset(offset);
    }
    function startFilledCheckChange(input,options){
        var val = input.val();
        (function checkloop(){
            animId = requestAnimationFrame(checkloop);
            if(input.val() !== val){
                hidePlaceholder(input,options);
                stopCheckChange();
                startEmptiedCheckChange(input,options);
            }
        }());
    }
    function startEmptiedCheckChange(input,options){
        (function checkloop(){
            animId = requestAnimationFrame(checkloop);
            showPlaceholderIfEmpty(input,options);
        }());
    }
    function stopCheckChange(){
        if (window.cancelAnimationFrame) {
          cancelAnimationFrame(animId);
        }
    }
    function log(msg){
        if(debug && window.console && window.console.log){
            window.console.log(msg);
        }
    }

    $.fn.placeHolder = function(config) {
        log('init placeHolder');
        var o = this;
        var l = $(this).length;
        this.options = $.extend({
            className: 'placeholder', // css class that is used to style the placeholder
            placeholderShownClass: 'placeholder-shown', // css class that is applied to a form field when its Placeholder is visible (polyfill for :placeholder-shown pseudo selector: https://www.w3.org/TR/selectors4/#placeholder-shown-pseudo)
            visibleToScreenreaders : true, // expose the placeholder text to screenreaders or not
            visibleToScreenreadersHideClass : 'placeholder-hide-except-screenreader', // css class is used to visually hide the placeholder
            visibleToNoneHideClass : 'placeholder-hide', // css class used to hide the placeholder for all
            hideOnFocus : false, // either hide the placeholder on focus or on type
            removeLabelClass : 'visuallyhidden', // remove this class from a label (to fix hidden labels)
            hiddenOverrideClass : 'visuallyhidden-with-placeholder', // replace the label above with this class
            forceHiddenOverride : true, // allow the replace of the removeLabelClass with hiddenOverrideClass or not
            forceApply : false, // apply the polyfill even for browser with native support
            autoInit : true // init automatically or not
        }, config || window.placeHolderConfig);
        this.options.hideClass = this.options.visibleToScreenreaders ? this.options.visibleToScreenreadersHideClass : this.options.visibleToNoneHideClass;
        return $(this).each(function(index) {
            var input = $(this),
                text = input.attr('placeholder'),
                id = input.attr('id'),
                label,placeholder,titleNeeded,polyfilled;

            function onFocusIn() {
                if(!o.options.hideOnFocus && window.requestAnimationFrame){
                    startFilledCheckChange(input,o.options);
                }else{
                    hidePlaceholder(input,o.options);
                }
            }

            if(text === "" || text === undefined) {
              text = input[0].attributes["placeholder"] ? input[0].attributes["placeholder"].value : "";
            }
            label = input.closest('label');
            input.removeAttr('placeholder');
            if(!label.length && !id){
                log('the input element with the placeholder needs an id!');
                return;
            }
            label = label.length ? label : $('label[for="'+id+'"]').first();
            if(!label.length){
                log('the input element with the placeholder needs a label!');
                return;
            }
            polyfilled = $(label).find('.' + o.options.className);
            if(polyfilled.length) {
                //log('the input element already has a polyfilled placeholder!');
                positionPlaceholder(polyfilled,input);
                polyfilled.text(text);
                return input;
            }
            if(label.hasClass(o.options.removeLabelClass)){
                label.removeClass(o.options.removeLabelClass)
                     .addClass(o.options.hiddenOverrideClass);
            }

            placeholder = $('<span>').addClass(o.options.className).text(text).appendTo(label);

            titleNeeded = (placeholder.width() > input.width());
            if(titleNeeded){
                placeholder.attr('title',text);
            }
            positionPlaceholder(placeholder,input);
            input.data('placeholder',placeholder);
            placeholder.data('input',input);
            placeholder.click(function(){
                $(this).data('input').focus();
            });
            input.focusin(onFocusIn);
            input.focusout(function(){
                showPlaceholderIfEmpty($(this),o.options);
                if(!o.options.hideOnFocus){
                    stopCheckChange();
                }
            });
            input.change(function(){
                showPlaceholderIfEmpty($(this),o.options);
            });
            showPlaceholderIfEmpty(input,o.options);
            $(window).bind("resize", function(){
                positionPlaceholder(placeholder,input);
            });
            //optional reformat on font resize - requires: http://www.tomdeater.com/jquery/onfontresize/
            $(document).bind("fontresize", function(){
                positionPlaceholder(placeholder,input);
            });

            // optional reformat when a textarea is being resized - requires http://benalman.com/projects/jquery-resize-plugin/
            if($.event.special.resize){
                $("textarea").bind("resize", function(event){
                    if ($(this).is(":visible")) {
                        positionPlaceholder(placeholder,input);
                    }
                    event.stopPropagation();
                    event.preventDefault();
                });
            }else{
                // we simply disable the resizeablilty of textareas when we can't react on them resizing
                $("textarea").css('resize','none');
            }

            if(index >= l-1 && typeof $.attrHooks !== 'undefined'){
                $.attrHooks.placeholder = {
                    get: function(elem) {
                        if (elem.nodeName.toLowerCase() === 'input' || elem.nodeName.toLowerCase() === 'textarea') {
                            if( $(elem).data('placeholder') ){
                                // has been polyfilled
                                return $( $(elem).data('placeholder') ).text();
                            }else{
                                // native / not yet polyfilled
                                return $(elem)[0].placeholder;
                            }
                        }else{
                            return undefined;
                        }
                    },
                    set: function(elem, value){
                        return $( $(elem).data('placeholder') ).text(value);
                    }
                };
            }

            if (input.is(":focus")) {
                onFocusIn();
            }
        });



    };
    $(function(){
        var config = window.placeHolderConfig || {};
        if(config.autoInit === false){
            log('placeholder:abort because autoInit is off');
            return;
        }
        if(('placeholder' in $('<input>')[0] || 'placeHolder' in $('<input>')[0]) && !config.forceApply){ // don't run the polyfill when the browser has native support
            log('placeholder:abort because browser has native support');
            return;
        }
        $('input[placeholder], textarea[placeholder]').placeHolder();
    });
}(jQuery));
