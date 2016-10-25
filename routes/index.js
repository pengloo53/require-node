var express = require('express');
var dbDept = require('../db/dept.js');
var dbMessage = require('../db/message.js');
var myUtil = require('../util/myUtil.js');
var router = express.Router();

/* 传输消息参数，获取add页面 */
function getAddPage(res,message){
  dbDept.findAllDepts(function(errs,rows){
    if(errs){
      res.render('err',{
        message: errs,
        error: errs
      });
    }else{
      res.render('add',{
        title: '添加需求',
        message: message,
        depts: rows
      });
    }
  });
}

/* 传输消息参数，获取首页 */
function getIndexPage(res,message){
  dbMessage.getAllMessages(function(errs,rows){
    if(errs){
      res.render('err',{
        message: errs,
        error: errs
      });
    }else{
      res.render('index',{
        title: '需求首页',
        message: message,
        messages: rows
      });
    }
  });
}

/* GET home page. */
router.get('/', function(req, res, next) {
  getIndexPage(res,'');
});

/* GET add page. */
router.get('/add', function(req,res,next){
  getAddPage(res,'');
});

/*  add requirement. */
router.post('/add', function(req,res,next){
  var title = req.body.title.trim();
  var content = req.body.content.trim();
  var dept = req.body.dept;
  var user = myUtil.getIp(req);
  var time = myUtil.getTime(new Date());
  var status = 1;
  console.log("..................................add message: %s,%s,%s,%s,%s,%d.",title,content,dept,user,time,status);
  if(title && dept ){
    dbMessage.addMessage(title,content,dept,time,user,status,function(errs,rows){
      if(!errs){
        getAddPage(res,'添加成功');
      }else{
        res.render('err',{
          message: errs,
          error: errs
        });
      }
    });
  }else{
    getAddPage(res,'请填写内容');
  }
});

module.exports = router;
