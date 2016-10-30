window.onload = function(){
  $("input:radio[name='cate']").change(function () {
    var item = $("input[name='cate']:checked").val();
    ajax_displayKeys(item);
  });

  $("#input-id").fileinput({
    'showUpload':false,
    'previewFileType':'any',
    'browseOnZoneClick': true,
    'language': 'zh'
  });
};


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
}