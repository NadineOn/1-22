var AppNS = {};
var windowHeight, tooltipHeight, tooltipContentHeight;
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

        $(window).resize(function(){
            windowHeight = $(window).height();
            tooltipHeight = Math.round(windowHeight*0.7);
            tooltipContentHeight = windowHeight - tooltipHeight; // 25px - is a wave height
        }).resize();

        AppNS.setCookie(); // for welcome popup

        AppNS.showMenu();

        //var windowHeight = $(window).height();

        //var tooltipHeight = Math.round(windowHeight*0.7);
        //var tooltipContentHeight = windowHeight - tooltipHeight; // 25px - is a wave height
        if (!AppNS.isTouchDevice()) {
            $('.b-page__item').hover(function(){
                $(this).find('.b-info').stop().animate({
                    top: tooltipHeight+'px'
                }, function() {
                    $('.b-info').css('height', tooltipContentHeight)
                })
            }, function() {
                $(this).find('.b-info').stop().animate({
                    top: '120%'
                }, function() {
                    $('.b-info').css('height', 'auto')
                })
            });
        } else {
            $('.b-page__item').click(function(){
                $(this).find('.b-info').stop().animate({
                    top: '70%'
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

    var $menu = $('.main-panel');
    AppNS.showMenu = function() {
        var $pointer = $('.fixed-panel__bars');
        $pointer.on('click', function(){
            if (!$menu.hasClass('main-panel_visible')) {
                $menu.addClass('main-panel_visible');
            } else {
                $menu.removeClass('main-panel_visible');
            }
        })
    }

    AppNS.setCookie = function() {
        var visit = AppNS.getCookie("cookie");
        if (visit == null) {
            var $window = $('.welcome-popup');
            $window.show();
            setTimeout(function(){
                $window.stop().animate({
                    top: '-100%'
                })
            }, 2000)

            var expire = new Date();
            expire = new Date(expire.getTime() + 7776000000);
            document.cookie = "cookie=here; expires=" + expire;
        }
    }

    AppNS.getCookie = function(c_name) {
        var c_value = document.cookie;
        var c_start = c_value.indexOf(" " + c_name + "=");
        if (c_start == -1) {
            c_start = c_value.indexOf(c_name + "=");
        }
        if (c_start == -1) {
            c_value = null;
        } else {
            c_start = c_value.indexOf("=", c_start) + 1;
            var c_end = c_value.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = c_value.length;
            }
            c_value = unescape(c_value.substring(c_start, c_end));
        }
        return c_value;
    }
    //AppNS.resizer = function() {
    //    $(window).resize(function(){
    //        $menu.removeClass('main-panel_visible');
    //    })
    //}


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
