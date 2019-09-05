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

        var teamRows = [];
        res.team.forEach(function (person, index) {
            if (index % 3 === 0) {
                teamRows.push([]);
            }
            if (!person.photo) {
                person.photo = "test.png";
            }
            if (person.social) {
                person.social.forEach(function (so) {
                    switch (so.type) {
                        case "email":
                            so.class = "fa-envelope";
                            break;
                        case "twitter":
                            so.class = "fa-twitter";
                            break;
                        case "linkedin":
                            so.class = "fa-linkedin";
                            break;
                        case "web":
                            so.class = "fa-html5";
                            break;
                        case "facebook":
                            so.class = "fa-facebook";
                            break;
                        default:
                            break;
                    }
                });
            }
            teamRows[teamRows.length - 1].push(person);
        });

        app = new Vue({
            el: "#app",
            data: {
                showOneProject: [false, false, false, false],
                researchTabs: [true, false, false, false],
                showProjectDetails: null,
                publications: res.publications,
                teamRows: teamRows
            },
            created() {
                this.showProjectDetails = new Set();
            },
            methods: {
                clickResearchTab(id, showOne) {
                    this.showProjectDetails.clear();

                    for (var i = 0; i < this.researchTabs.length; i++) {
                        this.showOneProject[i] = false;
                        if (id === i) {
                            Vue.set(this.researchTabs, i, true);
                        } else {
                            Vue.set(this.researchTabs, i, false);
                        }
                    }
                    Vue.set(this.showOneProject, id, showOne);

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
                },
                cleanShowOneProject() {
                    for (var i = 0; i < this.showOneProject.length; i++) {
                        this.showOneProject[i] = false;
                    }
                },
                cleanResearchTabs() {
                    for (var i = 0; i < this.researchTabs.length; i++) {
                        this.researchTabs[i] = false;
                    }
                },
                readProjectDetials(id) {
                    this.showProjectDetails.clear();
                    this.showProjectDetails.add(id);

                    this.cleanShowOneProject();
                    Vue.set(this.showOneProject, 0, false);

                    this.cleanResearchTabs();
                    Vue.set(this.researchTabs, 0, false);
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

    $("#goTopProject3").click(function () {
        app.clickResearchTab(1, true);
    });

    $("#link_top").on("click", function (e) {
        e.preventDefault();
        $("html, body").animate({scrollTop: "0px"}, 500, "linear");
    });
}

