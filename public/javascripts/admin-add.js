$(function(){
  $("input:radio[name='cate']").change(function () {
    var cate = $("input[name='cate']:checked").val();
    $.ajax({
      url: '/ajax/'+cate, async: true, success: function (result) {
        $("#keys").html(result);
      }
    });
  });

  // fileinput 插件
  $("#input-id").fileinput({
    showUpload: false,
    // showClose: false,
    // showUploadedThumbs: false,
    // browseOnZoneClick: true,
    previewFileType: 'any',
    language: 'zh',
    browseLabel: '图片多选',
    browseClass: 'btn btn-default',
    allowedFileTypes: ['image'], // 限制文件类型为图片
    allowedFileExtensions: ['jpg','png'], // 限制文件后缀名为jpg,png,gif
    maxFileCount: 3,  // 限制最多3张图片
    maxFileSize: 1024, // 限制图片大小，最大1024KB
    allowedPreviewTypes: ['image'],
    initialCaption: '可以选择最多3张图片，格式为png或者jpg，大小不超过1M',
    layoutTemplates: {
      main1: '{preview}\n' +
      '<div class="input-group {class}">\n' +
      '   <div class="input-group-btn">\n' +
      '       {browse}\n' +
      // '       {uploads}\n' +
      '       {remove}\n' +
      '   </div>\n' +
      '   {caption}\n' +
      '</div>',
      footer: '<div class="file-thumbnail-footer">\n' +
      '    <div class="file-caption-name">{caption}{size}</div>\n' +
      // '    {actions}\n' +
      '</div>'
    }
  });
});

/*
function ajax_displayKeys(cate){
  // 第一步：获取对象
  var xmlhttp;
  if(window.XMLHttpRequest){
    xmlhttp = new XMLHttpRequest();
  }else{
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  // 第二步：监听状态变化并响应
  xmlhttp.onreadystatechange = function(){
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
      document.getElementById("keys").innerHTML=xmlhttp.responseText;
    }
  };
  // 第三步：设置请求
  xmlhttp.open("GET",'/ajax/'+cate,true);
  // 第四步：发送请求
  xmlhttp.send();
}*/
