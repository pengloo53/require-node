$(function () {
  /* have up 过的message 样式设置 */
  $('.message-list-item').each(function(){
    var mid = $(this).attr('mid');
    var cookie = $.cookie('haveUp'+mid);
    if(cookie && cookie == 2){
      $(this).find('div.up').addClass('up-yes');
    }
  });
  /* up a message */
  $('.qa-rank .up').click(function () {
    var messageId = $(this).attr('data-messageId');
    var $plus = $('<span id="plus"><strong>+1</strong></span>');
    var $minus = $('<span id="minus"><strong>-1</strong></span>');
    var $this = $(this);
    var bool = $.cookie('haveUp'+messageId); // 是否Up
    if(!bool || bool == 1){
      $plus.insertAfter($this).css({
        'position': 'relative',
        'z-index': '1',
        'color': '#C30'
      }).animate({
        top: -30 + 'px',
        left: +30 + 'px'
      }, 'slow',function(){
        $(this).fadeIn('slow').remove();
      });
      $.ajax({
        url: '/ajax/up/' + messageId,
        method: 'POST',
        global: false,
        success: function (result) {
          $this.addClass('up-yes');
          // alert('add Success');
          $.cookie('haveUp'+messageId, 2, {path: '/', expires: 1});
        }
      });
      return false;
    }else{
      $minus.insertAfter($this).css({
        'position': 'relative',
        'z-index': '1',
        'color': '#5cb85c'
      }).animate({
        top: -30 + 'px',
        left: +30 + 'px'
      }, 'slow',function(){
        $(this).fadeIn('slow').remove();
      });
      $.ajax({
        url: '/ajax/cancel/'+ messageId,
        method: 'POST',
        global: false,
        success: function(result){
          $this.removeClass('up-yes');
          // alert('cancel success');
          $.cookie('haveUp'+messageId, 1, {path: '/'});
        }
      });
      return false;
    }
  });


  /* message-list-item 点击加载详细内容以及回复 */
  $('.message-list-item').click(function () {
    var mId = $(this).attr('mId') * 1;
    if (!$('#' + mId).children().length) {
      $.ajax({
        url: "/ajax/others/" + mId, success: function (result) {
          // alert(result);
          $('#' + mId).html(result);
        }
      });
    } else {
      $('#' + mId).toggle();
    }
    $(this).find('.qa-rank .up').toggle();
  });

  /* ajax 全局事件，loading提示 */
  $('#loading').ajaxStart(function () {
    $(this).show();
  }).ajaxStop(function () {
    $(this).hide();
  });

  /* 下拉状态列表，点击筛选 */
  $(".dropdown-menu li").click(function () {
    var statusComment = $(this).text();
    var status = covertStatus(statusComment);
    if ($(this).text() == '全部显示') {
      $('.message-list-item:hidden').show(500);
    } else {
      $('.message-list-item[status!="' + status + '"]').hide(500);
      $('.message-list-item[status="' + status + '"]').show(500);
    }
    $(this).parent().parent().removeClass('open');
    return false;
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
  for (var j = 0; j < $page.length; j++) {
    if ($page[j].innerText == page) {
      $page[j].setAttribute('class', 'active');
      break;
    }
  }
  var count = $('#count').val();
  if (count <= 20) {
    $('ul.pagination li a:contains(2)').removeAttr('href').parent().addClass('disabled');
    $('ul.pagination li a:contains(3)').removeAttr('href').parent().addClass('disabled');
    $('ul.pagination li a:last').removeAttr('href').parent().addClass('disabled');
  } else if (count <= 40) {
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

  /*  function ajaxGetStatusPage(status) {
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
   }*/
});

