$(function(){
  /* 下拉状态列表，悬停颜色变化 */
  /* 点击触发Ajax获取页面 */
  $(".dropdown-menu li").hover(function () {
    var statusComment = $(this).text();
    switch (statusComment) {
      case '已提交':
        $(this).find('a').css("background-color", "#d9534f");
        break;
      case '已解答':
        $(this).find('a').css("background-color", "#337ab7");
        break;
      case '跟进中':
        $(this).find('a').css("background-color", "#f0ad4e");
        break;
      case '已解决':
        $(this).find('a').css("background-color", "#5cb85c");
        break;
    }
  }, function () {
    var statusComment = $(this).text();
    if(statusComment != ''){
      $(this).find('a').css("background-color", "#ffffff");
    }
  }).click(function () {
    var statusComment = $(this).text();
    var status = covertStatus(statusComment);
    if($(this).text() == '全部显示'){
      $('tbody tr:hidden').show(500);
    }else{
      $('tbody tr[status!="'+status+'"]').hide();
      $('tbody tr[status="'+status+'"]').show();
    }
    $(this).parent().parent().removeClass('open');
    return false;
  });

  /* function */
  function covertStatus(statusComment) {
    switch (statusComment) {
      case '已提交':
        return 1;
        break;
      case '已解答':
        return 2;
        break;
      case '跟进中':
        return 3;
        break;
      case '已解决':
        return 4;
        break;
    }
  }

});