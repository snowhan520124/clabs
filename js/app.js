jQuery(document).ready(function ($) {
    "use strict";

    $(".Modern-Slider").slick({
        autoplay: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        dots: true,
        fade: true,
        pauseOnDotsHover: true,
        cssEase: "linear",
        draggable: false,
        prevArrow: '<button class="PrevArrow"></button>',
        nextArrow: '<button class="NextArrow"></button>'
    });

    $('.tabgroup > div').hide();
    $('.tabgroup > div:first-of-type').show();
    $('.tabs a').click(function (e) {
        e.preventDefault();
        var $this = $(this),
                tabgroup = '#' + $this.parents('.tabs').data('tabgroup'),
                others = $this.closest('li').siblings().children('a'),
                target = $this.attr('href');
        others.removeClass('active');
        $this.addClass('active');
        $(tabgroup).children('div').hide();
        $(target).show();

    });



    $(".box-video").click(function () {
        $('iframe', this)[0].src += "&amp;autoplay=1";
        $(this).addClass('open');
    });


    var contentSection = $('.content-section, .main-banner');
    var navigation = $('nav');

    //when a nav link is clicked, smooth scroll to the section
    navigation.on('click', 'a', function (event) {
        event.preventDefault(); //prevents previous event
        smoothScroll($(this.hash));
    });

    //update navigation on scroll...
    $(window).on('scroll', function () {
        updateNavigation();
    });
    //...and when the page starts
    updateNavigation();

    /////FUNCTIONS
    function updateNavigation() {
        contentSection.each(function () {
            var sectionName = $(this).attr('id');
            var navigationMatch = $('nav a[href="#' + sectionName + '"]');
            if (($(this).offset().top - $(window).height() / 2 < $(window).scrollTop()) &&
                    ($(this).offset().top + $(this).height() - $(window).height() / 2 > $(window).scrollTop()))
            {
                navigationMatch.addClass('active-section');
            } else {
                navigationMatch.removeClass('active-section');
            }
        });
    }
    function smoothScroll(target) {
        $('body,html').animate({
            scrollTop: target.offset().top
        }, 800);
    }
});

var app;
$.getJSON({
    url: "../lab_web_data.json"
}).done(function (res) {
    var fileServerPath = "http://creativitylabs.com/pubs/";

    res.publications.forEach(function (yearGroup, index, array) {
        if (!yearGroup.list.length) {
            array.splice(index, 1);
            return;
        }
        yearGroup.list.forEach(function (pub) {
            if (pub.file) {
                pub.file = fileServerPath + pub.file;
            }
        });
    });

    app = new Vue({
        el: "#app",
        data: {
            showOneProject: [false, false, false, false],
            publications: res.publications
        },
        methods: {
            doShowOneProject(index) {
                var self = this;
                if (index < 0) {
                    this.showOneProject.forEach(function (item, index) {
                        Vue.set(self.showOneProject, index, false);
                    });
                    console.log("showAll");
                } else {
                    Vue.set(self.showOneProject, index, true);
                }
                console.log("show " + index);
            }
        }
    });
});

$("#goTopProject1").click(function () {
    $("#tabMenuButton1").removeClass("active");
    $("#tabMenuButton2").removeClass("active");
    $("#tabMenuButton3").removeClass("active");
    $("#tabMenuButton4").removeClass("active");
    $("#tab2").css("display", "none");
    $("#tab3").css("display", "none");
    $("#tab4").css("display", "none");
    $("#tab1").css("display", "block");
    app.doShowOneProject(0);
});

$("#goTopProject2").click(function () {
    $("#tabMenuButton1").removeClass("active");
    $("#tabMenuButton2").removeClass("active");
    $("#tabMenuButton3").removeClass("active");
    $("#tabMenuButton4").removeClass("active");
    $("#tab1").css("display", "none");
    $("#tab2").css("display", "none");
    $("#tab3").css("display", "none");
    $("#tab4").css("display", "block");
    app.doShowOneProject(3);
});

$("#tabMenuButton1").click(function () {
    app.doShowOneProject(-1);
});
$("#tabMenuButton2").click(function () {
    app.doShowOneProject(-1);
});
$("#tabMenuButton3").click(function () {
    app.doShowOneProject(-1);
});
$("#tabMenuButton4").click(function () {
    app.doShowOneProject(-1);
});

$("#link_top").on("click", function (e) {
    e.preventDefault();
    $("html, body").animate({scrollTop: "0px"}, 500, "linear");
});


