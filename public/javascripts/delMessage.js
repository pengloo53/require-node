var id;
function openWindow(id){
  document.getElementById('light').style.display='block';
  document.getElementById('fade').style.display='block';
  id = this.id;
}
function closeWindow(){
  document.getElementById('light').style.display='none';
  document.getElementById('fade').style.display='none';
}

function delMessage(id){
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
      document.getElementById("alert").innerHTML=xmlhttp.responseText;
    }
  }

  // 第三步：设置请求
  xmlhttp.open("POST","/admin/del/"+Id,true);

  // 第四步：发送请求
  xmlhttp.send();
}