$("#test_b1").click(function () {
    console.log("hi");
    $("#tab2").css("display", "none");
    $("#tab3").css("display", "none");
    $("#tab4").css("display", "none");
    $("#tab1").css("display", "block");
    console.log("css");
});

$("#link_top").on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({scrollTop: "0px"}, 500, 'linear');
});

new Vue({
    el: "#app",
    data: {
        message: "hi"
    }
});


