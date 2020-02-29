// グローバル変数
var speed = 5000
var result = 5
var time = 0
var timer

// 画面サイズの変更
$(window).on("load resize", function () {
    var wH = $(window).height();
    var wW = $(window).width();
    $(".main_container").css({
        "height": wH + "px",
    });
    $(".hide_box").css({
        "height": wH + "px"
    });
});

// スタート
function start() {
    $("#start_btn").on("click", function () {
        $("#start_btn").hide()
        $("#stop_btn").show()
        startTimer()
        $("#target").animate({
            left: $(".des_icon").offset()["left"] + "px"
        }, speed, "linear")
    })
}

// 速度設定
function settingSpeed() {
    $(".speed_btn").on("click", function () {
        speed = Number($(this).text().split("秒")[0]) * 1000
    })
}

// タイマー起動
function startTimer() {
    result = speed / 1000
    timer = setInterval(function () {
        if ($(".hide_box").offset()["left"] + Number($(".hide_box").css("width").split("px")[0]) / 2 > $("#target").offset()["left"])
            $("#target").hide()
        time += 0.01
        result -= 0.01
    }, 10)
}

// 終了
function stop() {
    $("#stop_btn").on("click", function () {
        $("#target").show()
        $("#start_btn").show()
        $("#stop_btn").hide()
        $("#target").stop()
        clearInterval(timer)
        result = -result
        if (result < 0)
            $("#result").text(result.toFixed(2))
        else
            $("#result").text("+" + result.toFixed(2))
        $("#target").css({
            "left": "",
            "right": "0%"
        })
    })
}

// 結果画面のサイズ設定
function setResultScreen() {
    $(".result").css({
        "width": $(".setting").css("width")
    })
}

// メイン関数
$(function () {
    $("#stop_btn").hide()
    setResultScreen()
    settingSpeed()
    start()
    stop()
})