$(function () {
  colorStatus();

  /* message-list-item 悬停颜色 */
  $(".message-list-item").hover(function(){
    $(this).css("background-color","#FFF9EB");
  },function(){
    $(this).css("background-color","#fff");
  });

  /* message-list-item 点击加载详细内容以及回复 */
  $('.message-list-item').click(function(){
    var mId = $(this).attr('mId') * 1;
    if(!$('#'+ mId).children().length){
      $.ajax({
        url: "/ajax/others/" + mId, success: function (result) {
          // alert(result);
          $('#'+ mId).html(result);
        }
      });
    }else{
      $('#'+ mId).toggle();
    }
  });


  /* 下拉状态列表，悬停颜色变化 */
  /* 点击触发Ajax获取页面 */
  $(".dropdown-menu li").hover(function () {
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
  }, function () {
    $(this).css("background-color", "#ffffff");
  }).click(function () {
    ajaxGetStatusPage(covertStatus($(this).text()));
    $("ul.dropdown-menu").parent().removeClass('open');
  });

  /* 悬停显示下拉状态列表 */
  $("[data-hover]").hover(function () {
    $("ul.dropdown-menu").show(100);
  });
  $(".dropdown-menu").hover(function () {
    $("ul.dropdown-menu").show(100);
  }, function () {
    $("ul.dropdown-menu").hide(100);
  });
  $(".dropdown-menu li").click(function(){
    $("ul.dropdown-menu").hide(100);
  });

  /* 导航激活 */
  var $activeLi = $('li.category');
  var cate = $("ul.nav span").attr('cate'); // 获取URL指定的类别
  for (var i = 0; i < $activeLi.length; i++) {
    if (cate == $activeLi[i].innerText) {
      $activeLi[i].setAttribute('class', 'active');
      break;
    }
  }

  /* 分页激活 */
  var page = $('#page').val();
  var $page = $('ul.pagination li');
  for(var j=0 ; j < $page.length; j++){
    if($page[j].innerText == page){
      $page[j].setAttribute('class','active');
      break;
    }
  }
  var count = $('#count').val();
  if(count <= 20){
    $('ul.pagination li a:contains(2)').removeAttr('href').parent().addClass('disabled');
    $('ul.pagination li a:contains(3)').removeAttr('href').parent().addClass('disabled');
    $('ul.pagination li a:last').removeAttr('href').parent().addClass('disabled');
  }else if(count <= 40){
    $('ul.pagination li a:contains(3)').removeAttr('href').parent().addClass('disabled');
    $('ul.pagination li a:last').removeAttr('href').parent().addClass('disabled');
  }



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

  function ajaxGetStatusPage(status) {
    var statusId = status * 1;
    $.ajax({
      url: "/status/" + status, async: false, success: function (result) {
        $(".message-list").html(result);
        colorStatus();
      }
    });
  }

  function ajaxGetCatePage(category) {
    $.ajax({
      url: "/cate/" + category, async: false, success: function (result) {
        $(".message-list").html(result);
        colorStatus();
      }
    });
  }

  function colorStatus() {
    $(".status:contains(已提交)").css("background-color", "#d9534f");
    $(".status:contains(已解答)").css("background-color", "#337ab7");
    $(".status:contains(跟进中)").css("background-color", "#f0ad4e");
    $(".status:contains(已解决)").css("background-color", "#5cb85c");
  }
});

