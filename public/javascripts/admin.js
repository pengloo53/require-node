$(function () {
  var ajaxReturnMessageForGlobal = '';
  /* ajax获取类别，部门以及其他设置 */
  $('.nav li:not(:first)').click(function () {
    var value = $(this).text();
    switch (value) {
      case '部门':
        $.ajax({
          url: '/admin/data/dept',
          global: false,
          success: function (result) {
            $('#mainContent').html(result);
            $('#addDeptBtn').click(function () {
              var plant = $('input[name=plant]').val();
              var deptname = $('input[name=deptname]').val();
              // alert(deptname + plant);
              if (plant && deptname.trim()) {
                $.ajax({
                  url: '/admin/add/dept/',
                  method: 'POST',
                  data: {
                    plant: plant,
                    deptname: deptname
                  },
                  success: function (result) {
                    ajaxReturnMessageForGlobal = result;
                  }
                });
              }else{
                alert('不允许为空，请重新输入');
              }
            });
            $('input').focus(function(){
              $(this).keyup(function(e){
                if(e.which == 13){
                  $('#addDeptBtn').click();
                }
              })
            });
            $('.delDeptBtn').click(function(){
              var delId = $(this).data('id');
              // alert(delId);
              var $this = $(this);
              $.ajax({
                url: '/admin/del/dept',
                data: {
                  id: delId
                },
                method: 'POST',
                success: function(result){
                  ajaxReturnMessageForGlobal = result;
                  $this.parent().parent().fadeOut(500);
                }
              });
            });
          }
        });
        break;
      case '分类':
        $.ajax({
          url: '/admin/data/cates',
          global: false,
          success: function (result) {
            $('#mainContent').html(result);
            $('#addCateBtn').click(function(){
              var category = $('option:selected').val();
              var keyname = $('input[name=keyname]').val();
              // alert(category);
              if(category && keyname.trim()){
                $.ajax({
                  url: '/admin/add/cates/',
                  method: "POST",
                  data: {
                    category: category,
                    keyname: keyname
                  },
                  success: function(result){
                    ajaxReturnMessageForGlobal = result;
                  }
                });
              }else{
                alert('不允许为空，请重新输入');
              }
            });
            $('input').focus(function(){
              $(this).keyup(function(e){
                if(e.which == 13){
                  $('#addCateBtn').click();
                }
              })
            });
            $('.delCateBtn').click(function(){
              var delId = $(this).data('id');
              var $this = $(this);
              $.ajax({
                url: '/admin/del/cates',
                data: {
                  id: delId
                },
                method: 'POST',
                success: function(result){
                  ajaxReturnMessageForGlobal = result;
                  $this.parent().parent().fadeOut(500);
                }
              });
            });
          }
        });
        break;
      case '其他':
        $.ajax({
          url: '/admin/data/others',
          global: false,
          success: function (result) {
            $('#mainContent').html(result);
          }
        });
        break;
    }
    $(this).siblings().removeClass('active').end().addClass('active');
  });

  /* ajaxSuccess 全局事件 */
  $(document).ajaxSuccess(function(evt, request, settings){
    var $message = $('<strong>'+ajaxReturnMessageForGlobal +'</strong>');
    $message.appendTo('.container .row:eq(1) .nav').css({
      'color': 'red',
      'top': '10px',
      'position': 'relative'
    }).animate({'left': +20 + 'px'}, 'normal', function () {
      $(this).fadeOut('normal',function(){
        $(this).remove();
        $('.nav li[class=active]').click();
      });
    });
  });
});