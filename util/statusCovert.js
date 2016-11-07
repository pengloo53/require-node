exports.fromIdToComment = function(status){
  var comment = '';
  switch(status){
    case 1:
      comment = '已提交';
      break;
    case 2:
      comment = '已解答';
      break;
    case 3:
      comment = '跟进中';
      break;
    case 4:
      comment = '已解决';
      break;
  }
  return comment;
};

exports.fromCommentToId = function(status){
  var statusId = 0;
  switch(status){
    case '已提交':
      statusId = 1;
      break;
    case '已解答':
      statusId = 2;
      break;
    case '跟进中':
      statusId = 3;
      break;
    case '已解决':
      statusId = 4;
      break;
  }
  return statusId;
};
