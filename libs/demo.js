/**
* this is only needed in the Polyfill demos to disdinguish the difference between native placeholders and the polyfill
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
        console.log('has native!');
        msg = '<strong class="alert">YOUR CURRENT BROWSER HAS NATIVE SUPPORT! THE POLYFILL WILL NOT RUN!</strong>';
    }else{
        msg = '<strong>Your current Browser does not have native support so the Polyfill will work its magic :-)</strong>';
    }
    $('#browserlist').after(msg);
    $('#nav strong').after(' [<a title="in demo mode the placeholders rendered by the Polyfill will be red instead of their normal gray" class="demotoggle" href="'+link+'">toggle demo '+mode+'</a>]');
})(jQuery);