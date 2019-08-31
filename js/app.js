var newsSwiper;
var app;
var scrollTimer;

function smoothScroll(target) {
    $("body,html").animate({
        scrollTop: target.offset().top
    }, 800);
}

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

    var contentSection = $(".content-section");
    var navigation = $("nav");

    navigation.on("click", "a", function (event) {
        event.preventDefault();
        smoothScroll($(this.hash));
        console.log("click " + this.hash);
    });

    $(window).on("scroll", function () {
        if (scrollTimer) {
            clearTimeout(scrollTimer);
        }
        scrollTimer = setTimeout(function () {
            updateNavigation();
        }, 100);
    });
    updateNavigation();

    function updateNavigation() {
        var viewTop = $(window).scrollTop();
        var windowHeight = $(window).height();

        contentSection.each(function () {
            var sectionName = $(this).attr("id");
            var navigationMatch = $('nav a[href="#' + sectionName + '"]');
            var sectionTop = $("#" + sectionName).offset().top;
            var sectionHeight = $("#" + sectionName).height();

            if ((sectionTop - viewTop <= windowHeight / 2) && (sectionTop + sectionHeight - viewTop >= windowHeight / 2)) {
                navigationMatch.addClass("active-section");
            } else {
                navigationMatch.removeClass("active-section");
            }
        });
    }

    initVue();
});

function initVue() {
    $.getJSON({
        url: "https://raw.githubusercontent.com/hanaldo/clabs/master/lab_web_data.json"
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
                researchTabs: [true, false, false, false],
                publications: res.publications
            },
            methods: {
                clickResearchTab(i, showOne) {
                    var self = this;
                    Vue.set(self.showOneProject, i, showOne);
                    self.researchTabs.forEach(function (item, index, array) {
                        if (index === i) {
                            Vue.set(array, index, true);
                        } else {
                            Vue.set(array, index, false);
                        }
                    });
                    if (showOne) {
                        smoothScroll($("#research"));
                    }
                },
                nextNews() {
                    if (!newsSwiper) {
                        return;
                    }
                    newsSwiper.slideNext();
                    var videos = document.getElementsByClassName("news-videos");
                    for (var i = 0; i < videos.length; i++) {
                        videos[i].pause();
                    }
                }
            }
        });
        console.log("vue ready!");

        newsSwiper = new Swiper(".swiper-container", {
            spaceBetween: 150,
            pagination: {
                el: ".swiper-pagination",
                dynamicBullets: true
            },
            preventClicksPropagation: false,
            preventClicks: false,
            noSwiping: true
        });
        console.log("news ready!");

        initJsControls();
        console.log("js controls ready!");
    });
}

function initJsControls() {
    $("#goTopProject1").click(function () {
        app.clickResearchTab(0, true);
    });

    $("#goTopProject2").click(function () {
        app.clickResearchTab(3, true);
    });

    $("#link_top").on("click", function (e) {
        e.preventDefault();
        $("html, body").animate({scrollTop: "0px"}, 500, "linear");
    });
}

