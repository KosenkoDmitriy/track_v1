/*
 * pageScroll plugin for jQuery
 * by Daniel Sentker
 * @version 1.1
 * 18.08.2011
 * http://www.shiftedwork.de/blog/2011/08/18/mein-jquery-plugin-pagescroll-scrollto-alternative/
 *
 * Copyright (c) 2011 Daniel Sentker
 * Dual licensed under the MIT and GPL licenses.
 *
 *
 * Changelog:
 * v1.1:    - fixed malfunction in safari and chrome
 *          - improved onScrollFinish call
 */
(function($){
    $.fn.extend({
        pageScroll: function(options) {

            var defaults = {
                direction: 'vertical', /* not in use atm */
                speed: 1000,
                offset: 0,
                easing: '',
                activeClass: 'current',
                anchorSrc: 'href',
                event: 'click',
                writeHash: true,
                onScrollStart: function() {},
                onScrollFinish: function() {}
            };

            var o =  $.extend(defaults, options);

            $(this).bind(o.event, function(e) {
                var $this = $(this);
                o.onScrollStart.call(this, $this);
                if(!o.writeHash) {
                    e.preventDefault();
                }
                $('.' + o.activeClass).removeClass(o.activeClass);
                $this.addClass(o.activeClass);
                var targetAnchorId = $this.attr(o.anchorSrc);
                var elOffset = $(targetAnchorId).offset();
                if(elOffset !== null) {
                    $('body, html').stop().animate({
                        scrollTop: elOffset.top - o.offset
                    }, o.speed, o.easing).last().queue(function() {
                        o.onScrollFinish.call(this, $this);
                        $(this).dequeue();
                    });
                }
            });
        }
    });
})(jQuery);