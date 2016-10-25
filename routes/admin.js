var express = require('express');
var dbDept = require('../db/dept.js');
var dbMessage = require('../db/message.js');
var myUtil = require('../util/myUtil.js');
var router = express.Router();

// 传递消息，获取admin首页
function getAdminPage(res,message){
  dbMessage.getAllMessages(function(errs,rows){
    if(errs){
      res.render('err',{
        message: errs,
        error: errs
      });
    }else{
      res.render('admin', {
        title: '管理员首页',
        messages: rows,
        message: message
      });
    }
  });
}

// 传递信息，获取admin状态首页
function getAdminPageByStatus(res,message,status){
  dbMessage.getMessagesByStatus(status, function(errs, rows){
    if(!errs){
      res.render('admin',{
        title: '管理员首页',
        messages: rows,
        message: message
      });
    }else{
      res.render('err',{
        message: errs,
        error: errs
      });
    }
  });
}

/* GET home page. */
router.get('/', function(req, res, next) {
  getAdminPage(res, '');
});

/* GET home page . distinct status: status=1 is no comment; status=2 is comment */
router.get('/:status', function(req,res,next){
  var status = req.params.status;
  if(!isNaN(status)){
    getAdminPageByStatus(res,'',status);
  }else{
    next();
  }
});

/* Reply message */
router.post('/1', function(req,res,next){
  var id = req.body.id;
  var status = 2;
  var reContent = req.body.reContent;
  var reTime = myUtil.getTime(new Date());
  var reUser = myUtil.getIp(req);
  if(reContent){
    dbMessage.replyMessage(id,reContent,reTime,reUser,status,function(errs,rows){
      if(!errs){
        getAdminPageByStatus(res,'回复成功',1)
      }else{
        res.render('err',{
          message: errs,
          error: errs
        });
      }
    });
  }
});

module.exports = router;