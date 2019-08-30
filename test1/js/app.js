var app = new Vue({
    el: "#app",
    data: {
        showOneProject: [false, false, false, false]
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


