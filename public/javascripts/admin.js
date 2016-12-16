$(function () {
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
            $('#addDeptForm').click(function(){
              var plant = $('input[name=plant]').val();
              var deptname = $('input[name=deptname]').val();
              // alert(deptname + plant);
              if (plant && deptname) {
                $.ajax({
                  url: '/admin/add/dept/',
                  method: 'POST',
                  data: {
                    plant: plant,
                    deptname: deptname
                  },
                  global: false,
                  success: function (result) {
                    result = '<p>' + result + '</p>';
                    $('.nav li:has(".active")').html(result);
                  }
                });
              }
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
});