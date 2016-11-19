$(function(){
  // 下拉状态列表颜色
  $(".dropdown-menu li").hover(function(){
    var statusComment = $(this).text();
    switch (statusComment) {
      case '已提交':
        $(this).css("background-color", "#d9534f");
        break;
      case '已解答':
        $(this).css("background-color", "#337ab7");
        break;
      case '跟进中':
        $(this).css("background-color", "#f0ad4e");
        break;
      case '已解决':
        $(this).css("background-color", "#5cb85c");
        break;
    }
  },function(){
    $(this).css("background-color", "#ffffff");
  });

  // 下拉状态列表ajax请求数据
  $(".dropdown-menu li").click(function(){
    var statusComment = $(this).text();
    var status = 0;
    switch(statusComment){
      case '已提交':
        status = 1;
        break;
      case '已解答':
        status = 2;
        break;
      case '跟进中':
        status = 3;
        break;
      case '已解决':
        status = 4;
        break;
    }
    // ajaxGetStatusPage(status);
  });

/*  function ajaxGetStatusPage(status){
    var statusId = status * 1;
    $.ajax({
      url: "/status/" + status, async: false, success: function (result) {
        $(".message-list").html(result);
      }
    });
  }*/

});