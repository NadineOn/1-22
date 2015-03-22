var AppNS = {};

(function($, undefined){

    /**
     * Init events
     */
    AppNS.init = function() {
        //
        //AppNS.makeOrder();

        //if($('#slider').length) {
        //    AppNS.mainSlider();
        //}

        //if($('.b-info').length) {
        //    AppNS.slideHoverInfoBlock();
        //    AppNS.clickHoverInfoBlock();
        //}

        if (!AppNS.isTouchDevice()) {
            $('.b-page__item').hover(function(){
                $(this).find('.b-info').stop().animate({
                    bottom: 0
                })
            }, function() {
                $(this).find('.b-info').stop().animate({
                    bottom: '-400px'
                })
            });
        } else {
            $('.b-page__item').click(function(){
                $(this).find('.b-info').stop().animate({
                    bottom: 0
                })
            }/*, function() {
                $(this).find('.b-info').stop().animate({
                    bottom: '-400px'
                })
            }*/);
        }


//        function is_touch_device() {
//            return (('ontouchstart' in window)
//                || (navigator.MaxTouchPoints > 0)
//                || (navigator.msMaxTouchPoints > 0));
//        }



        //$('.b-page__item').toggle(function(){
        //    console.log('111')
        //    //$(this).bind('mouseover');
        //}, function() {
        //    console.log('333')
        //    //$(this).bind('mouseleave');
        //})
    };

    AppNS.isTouchDevice = function() {
        return (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
    }

    //AppNS.mainSlider = function() {
    //    var slider = $('#slider .bxslider').bxSlider({
    //        minSlides: 1,
    //        maxSlides: 1,
    //        slideWidth: '999',
    //        mode: 'fade',
    //        pager: false,
    //        controls: false,
    //        auto: true,
    //        speed: 800
    //    });
    //
    //    $('#slider .next').click(function(){
    //        slider.goToNextSlide();
    //    });
    //    $('#slider .prev').click(function(){
    //        slider.goToPrevSlide();
    //    });
    //}

    ////var $infoBlock = $('.b-info');
    //AppNS.showInfoBlock = function($el) {
    //    $el.stop().animate({
    //        bottom: 0
    //    })
    //}
    //
    //AppNS.hideInfoBlock = function($el) {
    //    $el.stop().animate({
    //        bottom: '-400px'
    //    })
    //}

    //AppNS.makeOrder = function() {
    //    $('.make-order').fancybox({
    //        padding : 0,
    //        margin: 35,
    //        minWidth:500
    //    })
    //}

    // call to init events
    $(AppNS.init);

})(jQuery);