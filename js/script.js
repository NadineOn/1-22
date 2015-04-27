var AppNS = {};
var windowHeight, windowWidth, tooltipHeight, tooltipContentHeight, infoBlockHeight;
(function($, undefined){

    /**
     * Init events
     */
    AppNS.init = function() {
        $(window).resize(function(){
            windowHeight = $(window).height();
            windowWidth = $(window).width();
            tooltipHeight = Math.round(windowHeight*0.7);
            tooltipContentHeight = windowHeight - tooltipHeight;
            infoBlockHeight = $('.b-page__item').outerHeight() + 25;// 25px - is a wave height
            AppNS.showHoverData(windowWidth, infoBlockHeight, tooltipContentHeight);
        }).resize();

        AppNS.setCookie(); // for welcome popup
        AppNS.showMenu();
        AppNS.showMainInfo();
        AppNS.formStyler();
        AppNS.scrollPage();

        if ($('#map').length) initialize();
    };

    AppNS.scrollPage = function() {
        $(".creative-anons__btn").click(function() {
            $('html, body').animate({
                scrollTop: $(".speakers").offset().top
            }, 2000);
        });
    }

    AppNS.showMainInfo = function() {
        $('.b-info__more').on('click', function(){
            var $infoBlock = $(this).closest('.b-info');
            $infoBlock.addClass('b-info_open').stop().animate({
                top: '7%'
            });
        });
    }

    AppNS.formStyler =  function() {
        $('.customSelect, .customCheckbox').styler({
            //filePlaceholder: 'Добавить логотип'
        });

        var parentsForm = $('.hidden-form').html();
        $('.user-age').change(function() {
            if ($(this).val() < 18) {
                $('.form-el__parents').html(parentsForm);
            } else {
                $('.form-el__parents').empty();
            }
        })
    }

    AppNS.showHoverData = function(windowWidth, infoBlockHeight, tooltipContentHeight){
        var el = $('.b-page__item');
        if (windowWidth > 992) {
            el.removeClass('hidden-mobile');
        } else {
            el.addClass('hidden-mobile');
        }
        if (!el.hasClass('hidden-mobile')) {
            el.hover(function(){
                var $infoBlock = $(this).find('.b-info');
                $infoBlock.stop().show().animate({
                    top: tooltipHeight+'px'
                }, function() {
                    $infoBlock.css('height', tooltipContentHeight)
                })
            }, function() {
                var $infoBlock = $(this).find('.b-info');
                $infoBlock.stop().animate({
                    top: '110%'
                }, function() {
                    $infoBlock.hide().removeClass('b-info_open').css('height', 'auto')
                })
            });
        } else {
            $('.b-info').hide().removeClass('b-info_open').css({'height': 'auto', 'top': '310%'})
        }
    }


    AppNS.showMenu = function() {
        var $menu = $('.main-panel');
        var $pointer = $('.fixed-panel__bars');
        var $panel = $('.fixed-panel');
        $pointer.on('click', function(){
            if (!$menu.hasClass('main-panel_visible')) {
                $panel.addClass('fixed-panel_opened');
                $menu.addClass('main-panel_visible');
            } else {
                $panel.removeClass('fixed-panel_opened');
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


function initialize() {
    var haightAshbury = new google.maps.LatLng(50.4342192, 30.5077357);//(долгота, широта)
    var mapOptions = {
        zoom: 16,
        center: haightAshbury,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false
    };
    map = new google.maps.Map(document.getElementById("map"), mapOptions);//инициализация карты
    marker = new google.maps.Marker({
        position: haightAshbury,
        map: map
    });
}