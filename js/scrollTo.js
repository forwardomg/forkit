var scrollTo = (function() {
  	var elements = $('[data-scroll]');
    return {
        scrollAnimate: function(element, speed, easing, correction) {
            var offsetTop = $(element).offset().top;
                speed = speed || 1000,
                easing = easing || 'swing',
                correction = correction || 0;
            $("html, body").animate({ scrollTop: offsetTop + correction}, speed, easing);
        },
    	handle: function() {
            var that = this
    		$(elements).on('click', function(event) {
                event.preventDefault();
                var target = $(this).data('scroll'),
                    speed = $(this).data('scroll-speed'),
                    easing = $(this).data('scroll-easing'),
                    correction = $(this).data('scroll-correction');
                that.scrollAnimate(target, speed, easing, correction);
            });
    	},
        init: function() {
        	this.handle();
        }
    }
}());
scrollTo.init();