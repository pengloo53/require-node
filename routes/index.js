var express = require('express');
var dbDept = require('../db/dept.js');
var dbMessage = require('../db/message.js');
var dbCates = require('../db/cates.js');
var myUtil = require('../util/myUtil.js');
var router = express.Router();
var util = require('util');
var upload = require('../util/multerUpload.js');

/* 传输消息参数，获取add页面 */
function getAddPage(res,message){
  dbDept.findAllDepts(function(errs1,rows1){
    dbCates.getAllCates(function(errs2,rows2){
      dbCates.getkeysByCate('IT', function(errs3,rows3){
        if(!errs1 && !errs2 && !errs3) {
          res.render('add', {
            title: '添加需求',
            message: message,
            depts: rows1,
            cates: rows2,
            keys: rows3
          });
        }else{
          next();
        }
      });
    });
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

/* ----------------- BEGIN Ajax ----------------------*/
/* GET keys by cate use ajax*/
router.get('/ajax/:cate', function(req,res,next){
  var cate = req.params.cate;
  dbCates.getkeysByCate(cate,function(errs,rows){
    res.render('ajax/add_keys',{
      cate: cate,
      keys: rows
    });
  });
});
/* ----------------- END Ajax ----------------------*/

/* GET home page. */
router.get('/', function(req, res, next) {
  getIndexPage(res,'');
});

/* GET add page. */
router.get('/add', function(req,res,next){
  getAddPage(res,'');
});

/*  add requirement. */
router.post('/add', upload.array('image'), function(req,res,next){
  console.log(util.inspect(req.files));
  console.log(util.inspect(req.body));
  var category = req.body.cate;
  var keyname = req.body.key;
  var content = req.body.content.toString().trim();
  var dept = req.body.dept;
  var image = [];
  for(var i = 0 ; i< req.files.length; i ++){
    image.push(req.files[i].filename);
  }
  var user = myUtil.getIp(req);
  var time = myUtil.getTime(new Date());
  var status = 1;
  console.log("..................................add message: %s,%s,%s,%s,%s,%d.",category,keyname,content,dept,user,time,status);
  if(keyname && content && dept ){
    dbMessage.addMessage(category,keyname,content,dept,time,user,status,image,function(errs,rows){
      if(!errs){
        getAddPage(res,'添加成功');
      }else{
        res.render('err',{
          message: errs,
          error: errs
        })
      }
    });
  }else{
    getAddPage(res,'请填写完整');
  }
});

module.exports = router;
