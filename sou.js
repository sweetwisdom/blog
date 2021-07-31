/*
作者:D.Young
主页：https://yyv.me/
github：https://github.com/5iux/sou
日期：2019-07-26
版权所有，请勿删除
*/

$(document).ready(function () {
  //判断窗口大小，添加输入框自动完成
  var wid = $("body").width();
  if (wid < 640) {
    $(".wd").attr("autocomplete", "off");
  } else {
    $(".wd").focus();
  }
  //按钮
  $(".sou li").click(function () {
    var dt = $(this).attr("data-s");
    wd = $(".wd").val();
    if (dt == "google") {
      if (wd == "" || wd == null) {
        window.location.href = "https://www.google.com/?hl=zh";
      } else {
        $("form").attr("action", "https://www.google.com.hk/search?hl=zh");
        $(".wd").attr("name", "q");
        $(".t").val("g");
        $("form").submit();
      }
    } else if (dt == "360") {
      if (wd == "" || wd == null) {
        window.location.href = "https://www.so.com/";
        console.log("360搜索");
      } else {
        $("form").attr("action", "https://www.so.com/s?ie=utf-8");
        $(".wd").attr("name", "q");
        $(".t").val("g");
        $("form").submit();
      }
    } else {
      if (wd == "" || wd == null) {
        window.location.href = "https://www.baidu.com/?tn=simple";
      } else {
        $("form").attr("action", "https://www.baidu.com/s?ie=utf-8");
        $(".wd").attr("name", "wd");
        $(".t").val("b");
        $("form").submit();
      }
    }
  });
  //菜单点击
  $("#menu").click(function (event) {
    $(this).toggleClass("on");
    $(".list").toggleClass("closed");
  });
  $("#content").click(function (event) {
    $(".on").removeClass("on");
    $(".list").addClass("closed");
  });
  $(".mywth").click(function (event) {
    var wt = $("body").width();
    if (wt < 750 || wt == 750) {
      window.location.href = "https://tianqi.qq.com/";
      window.location.href = "https://apip.weatherdt.com/h5.html?id=pjICbzAo4C";
    }
  });
});

//关键词sug
$(function () {
  //当键盘键被松开时发送Ajax获取数据
  $(".wd").keyup(function () {
    var keywords = $(this).val();
    if (keywords == "") {
      $("#word").hide();
      return;
    }
    $.ajax({
      url: "https://suggestion.baidu.com/su?wd=" + keywords,
      dataType: "jsonp",
      jsonp: "cb", //回调函数的参数名(键值)key
      // jsonpCallback: 'fun', //回调函数名(值) value
      beforeSend: function () {
        // $('#word').append('<li>正在加载。。。</li>');
      },
      success: function (data) {
        $("#word").empty().show();
        if (data.s == "") {
          //$('#word').append('<div class="error">Not find  "' + keywords + '"</div>');
          $("#word").hide();
        }
        $.each(data.s, function () {
          $("#word").append(
            '<li><svg class="iconfont icon-sousuo" style=" width: 15px; height: 15px; opacity: 0.5;" aria-hidden="true"><use xlink:href="#icon-sousuo"></use></svg> ' +
              this +
              "</li>"
          );
        });
      },
      error: function () {
        $("#word").empty().show();
        //$('#word').append('<div class="click_work">Fail "' + keywords + '"</div>');
        $("#word").hide();
      },
    });
  });
  //点击搜索数据复制给搜索框
  $(document).on("click", "#word li", function () {
    var word = $(this).text();
    $(".wd").val(word);
    $("#word").hide();
    $("form").submit();
    // $('#texe').trigger('click');触发搜索事件
  });
});
