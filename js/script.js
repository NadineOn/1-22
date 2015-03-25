var AppNS = {};
var windowHeight, tooltipHeight, tooltipContentHeight, infoBlockHeight;
(function($, undefined){

    /**
     * Init events
     */
    AppNS.init = function() {

        $(window).resize(function(){
            windowHeight = $(window).height();
            tooltipHeight = Math.round(windowHeight*0.7);
            tooltipContentHeight = windowHeight - tooltipHeight;
            infoBlockHeight = $('.b-page__item').outerHeight() + 25;// 25px - is a wave height
        }).resize();

        AppNS.setCookie(); // for welcome popup

        AppNS.showMenu();
        AppNS.showMainInfo();

        if (!AppNS.isTouchDevice()) {
            $('.b-page__item').hover(function(){
                console.log(infoBlockHeight)
                var $infoBlock = $(this).find('.b-info');
                $infoBlock.stop().animate({
                    top: tooltipHeight+'px'
                }, function() {
                    $infoBlock.css('height', tooltipContentHeight)
                })
            }, function() {
                var $infoBlock = $(this).find('.b-info');
                $infoBlock.stop().animate({
                    top: infoBlockHeight+'px'
                }, function() {
                    $infoBlock.removeClass('b-info_open').css('height', 'auto')
                })
            });
        } else {
           /* $('.b-page__item').click(function(){
                $(this).find('.b-info').stop().animate({
                    top: '70%'
                })
            }, function() {
                $(this).find('.b-info').stop().animate({
                    bottom: '-400px'
                })
            });*/
        }
    };

    AppNS.showMainInfo = function() {
        $('.b-info').css('top', infoBlockHeight+'px')
        $('.b-info__more').on('click', function(){
            var $infoBlock = $(this).closest('.b-info');
            $infoBlock.addClass('b-info_open').stop().animate({
                top: '7%'
            });
        })
    }

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

    // call to init events
    $(AppNS.init);

})(jQuery);
