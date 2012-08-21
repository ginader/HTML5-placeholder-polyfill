/**
* this is only needed in the Polyfill demos to distinguish the difference between native placeholders and the polyfill
*/
if(window.location.search && window.location.search == '?demo'){
    window.demo = true;
    document.documentElement.className += ' demo';
}

(function($) {
    var mode = window.demo ? 'OFF' : 'ON',
        link = window.demo ? '?' : '?demo',
        msg = '';
    if('placeholder' in $('<input>')[0]){ // don't run the polyfill when the browser has native support
        msg = '<strong class="alert">YOUR CURRENT BROWSER HAS NATIVE SUPPORT! ';
        if(window.placeHolderConfig && window.placeHolderConfig.forceApply){
            msg += "THE POLYFILL WOULD'T NOT RUN BUT IT'S FORCED IN THIS EXAMPLE!";
        }else{
            msg += 'THE POLYFILL WILL NOT RUN!';
        }
        msg += '</strong>';
    }else{
        msg = '<strong>Your current Browser does not have native support so the Polyfill will work its magic :-)</strong>';
    }
    $('#browserlist').after(msg);
    $('#nav strong').after(' [<a title="in demo mode the placeholders rendered by the Polyfill will be red instead of their normal gray" class="demotoggle" href="'+link+'">toggle demo '+mode+'</a>]');



    $('#updatetestbutton').click(function(){
        var currentPlaceholer = $('#updatetest').attr('placeholder');
        alert(currentPlaceholer);
        if(currentPlaceholer == 'whatever'){
            $('#updatetest').attr('placeholder','e.g. 42');
        }else{
            $('#updatetest').attr('placeholder','whatever');
        }
    });
})(jQuery);