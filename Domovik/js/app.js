"use strict";

$(function () {


    const isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (
                isMobile.Android() ||
                isMobile.BlackBerry() ||
                isMobile.iOS() ||
                isMobile.Opera() ||
                isMobile.Windows()
            );
        },
    };

    function getNavigator() {
        if (isMobile.any() || window.innerWidth < 992) {
            $("body").removeClass("_pc").addClass("_touch");
        } else {
            $("body").removeClass("_touch").addClass("_pc");
        }
    }

    getNavigator();

    $(window).on("resize", () => getNavigator());



    // click handler
    $(document).on('click', function (e) {

        let $target = $(e.target);

        console.log($target);


        // menu
        if ($target.hasClass('header__menu-toggler')) {
            $(".header").toggleClass("open-menu");

        }


        // submenu
        if ($target.is('.header__product-link')) {

            if ($("body").hasClass('_pc')) return;


            e.preventDefault();
            let $submenu = $target.next();
            if ($submenu.length > 0) {

            }

            if ($target.hasClass('active')) {

                $target.removeClass('active');
                $submenu.removeClass('active');

            } else {

                $('.menu__link').removeClass('active');
                $('.submenu').removeClass('active');

                $target.addClass('active');
                $submenu.addClass('active');
            }

        }

        // more options in table 
        if ($target.is('.configuration__btn')) {
            $target.prev().toggleClass("full");
            $target.toggleClass("active");
            if ($target.hasClass('active')) {
                $target.text('Скрыть');
            } else {
                $target.text('СМОТРЕТЬ КОМПЛЕКТАЦИЮ ПОЛНОСТЬЮ');
            }
        }

    });

    $(document).on('click touchend', '.fancybox-slide', function (e) {
        if ($(e.target).hasClass('fancybox-slide')) {
            $.fancybox.close();
        }
    });

    // ideas block logic

    $(".ideas__item-btn.active").siblings(".ideas__item-desc").slideDown(0);

    $(".ideas__item-btn").on("click", function () {
        let $btn = $(this);
        let $item = $btn.closest(".ideas__item");
        let index = $item.index();

        if ($btn.hasClass("active")) return;

        $(".ideas__item-desc").stop(true, true).slideUp();
        $(".ideas__item-btn").removeClass("active");
        $(".ideas__point").removeClass("active");

        $btn.addClass("active");
        $btn.siblings(".ideas__item-desc").stop(true, true).slideDown();
        $(".ideas__point").eq(index).addClass("active");
    });

    $(".ideas__point").on("click", function () {
        let index = $(this).index();
        $(".ideas__item-btn").eq(index).trigger("click");
    });




    // sliders

    if ($('.projects__slider').length > 0) {

        $('.projects__slider').slick({
            infinite: false,
            arrows: true,
            slidesToShow: 3,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 2,
                        arrows: true,
                        dots: false,
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 1,
                    }
                },
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 1.1,
                        arrows: false,
                        dots: false,
                    }
                },
            ]
        });
    }

    if ($('.project__slider').length > 0) {
        $('.project__slider').each(function () {
            var $slider = $(this);


            $slider.slick({
                infinite: true,
                arrows: false,
                dots: true,
                slidesToShow: 1,
                speed: 0
            });

            var totalSlides = $slider.slick('getSlick').slideCount;


            $slider.on('mousemove', function (e) {
                var sliderWidth = $slider.width();
                var mouseX = e.pageX - $slider.offset().left;

                var partWidth = sliderWidth / totalSlides;

                var slideIndex = Math.floor(mouseX / partWidth);

                $slider.slick('slickGoTo', slideIndex);
            });
        });

    }

    if ($('.benefits__slider').length > 0) {

        $('.benefits__slider').slick({
            infinite: true,
            slidesToShow: 4,
            arrows: true,
            dots: false,
            responsive: [
                {
                    breakpoint: 1600,
                    settings: {
                        slidesToShow: 3,
                        arrows: true,
                        dots: false,
                    }
                },
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 2,
                        arrows: true,
                        dots: false,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1.5,
                        arrows: false,
                        dots: false,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1.1,
                        arrows: false,
                        dots: false,
                    }
                }
            ]
        });
    }

    if ($('.videos__slider').length > 0) {

        $('.videos__slider').slick({
            infinite: true,
            slidesToShow: 5,
            arrows: true,
            dots: false,
            responsive: [
                {
                    breakpoint: 1800,
                    settings: {
                        slidesToShow: 4,
                    }
                },

                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1.5,
                        arrows: false,
                        dots: false,
                    }
                },
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 1.1,
                    }
                }
            ]
        });
    }

    if ($('.plans__slider').length > 0) {

        $('.plans__slider').slick({
            infinite: true,
            slidesToShow: 2,
            arrows: true,
            dots: false,
            responsive: [

                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 1,
                    }
                },

            ]
        });
    }


    // input mask

    var phoneInputs = $('input[type="tel"]');

    if (phoneInputs.length > 0) {
        $("input[type='tel']").inputmask("+7 (999) 999-9999");
    }



    // header height

    getHeaderHeight();

    function getHeaderHeight() {
        const headerHeight = $('.header').outerHeight();
        $("body").css('--header-height', headerHeight + "px");
        return headerHeight;
    }

    window.addEventListener('resize', () => getHeaderHeight());


    $(window).on('scroll', getHeaderScrollClass);
    getHeaderScrollClass()

    function getHeaderScrollClass() {
        if ($(this).scrollTop() > getHeaderHeight()) {
            $('header').addClass('scroll');
        } else {
            $('header').removeClass('scroll');
        }
    }



    // animation

    let ticking = false;

    function animateElements() {
        $("[data-animate]").each(function () {
            let $el = $(this);

            if ($el.hasClass("active")) return;

            let elTop = $el.offset().top;
            let elMiddle = elTop + ($el.outerHeight() / 2);

            let viewportTop = $(window).scrollTop();
            let viewportMiddle = viewportTop + ($(window).height() / 2);

            if (elMiddle >= viewportTop && elMiddle <= viewportMiddle) {
                $el.addClass("active");

                if ($el.data("animate") === "number") {
                    let finalValue = parseInt($el.text().replace(/\D/g, ""), 10) || 0;
                    $el.text(0).prop("counter", 0).animate(
                        { counter: finalValue },
                        {
                            duration: 1500,
                            step: function (now) {
                                $el.text(Math.floor(now));
                            },
                        }
                    );
                }
            }
        });

        ticking = false;
    }

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(animateElements);
            ticking = true;
        }
    }

    $(window).on("scroll resize", onScroll);
    animateElements();



});
