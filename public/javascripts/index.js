window.onload = function(){
  colorStatus();

  /* 下拉状态列表，悬停颜色变化 */
  $(".dropdown-menu li:contains(已提交)").hover(function(){
    $(".dropdown-menu li:contains(已提交)").css("background-color","#d9534f");
  },function(){
    $(".dropdown-menu li:contains(已提交)").css("background-color","#ffffff");
  });
  $(".dropdown-menu li:contains(已解答)").hover(function(){
    $(".dropdown-menu li:contains(已解答)").css("background-color","#337ab7");
  },function(){
    $(".dropdown-menu li:contains(已解答)").css("background-color","#ffffff");
  });
  $(".dropdown-menu li:contains(跟进中)").hover(function(){
    $(".dropdown-menu li:contains(跟进中)").css("background-color","#f0ad4e");
  },function(){
    $(".dropdown-menu li:contains(跟进中)").css("background-color","#ffffff");
  });
  $(".dropdown-menu li:contains(已解决)").hover(function(){
    $(".dropdown-menu li:contains(已解决)").css("background-color","#5cb85c");
  },function(){
    $(".dropdown-menu li:contains(已解决)").css("background-color","#ffffff");
  });

  /* 点击触发Ajax获取页面 */
  $(".dropdown-menu li:contains(已提交)").click(function(){
    ajaxGetStatusPage(1);
  });
  $(".dropdown-menu li:contains(已解答)").click(function(){
    ajaxGetStatusPage(2);
  });
  $(".dropdown-menu li:contains(跟进中)").click(function(){
    ajaxGetStatusPage(3);
  });
  $(".dropdown-menu li:contains(已解决)").click(function(){
    ajaxGetStatusPage(4);
  });

  $(".nav li:gt(0)").click(function(){
    $(".nav li").removeClass('active');
    $(this).addClass('active');
    var category = $(this).attr('id');
    ajaxGetCatePage(category);
  });

  function ajaxGetStatusPage(status){
    $.ajax({url:"/status/" + status, async:false,success:function(result){
      $(".message-list").html(result);
      colorStatus();
    }});
  }

  function ajaxGetCatePage(category){
    $.ajax({url:"/cate/" + category, async:false,success:function(result){
      $(".message-list").html(result);
      colorStatus();
    }});
  }

  function colorStatus(){
    $(".status:contains(已提交)").css("background-color","#d9534f");
    $(".status:contains(已解答)").css("background-color","#337ab7");
    $(".status:contains(跟进中)").css("background-color","#f0ad4e");
    $(".status:contains(已解决)").css("background-color","#5cb85c");
  }
};

