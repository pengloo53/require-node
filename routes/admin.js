var express = require('express');
var dbDept = require('../db/dept.js');
var dbMessage = require('../db/message.js');
var dbCates = require('../db/cates.js');
var myUtil = require('../util/myUtil.js');
var router = express.Router();

// 传递消息，获取admin首页
/*function getAdminPage(res,message){
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
 }*/

// 传递信息，获取admin状态首页
/*function getAdminPageByStatus(res,message,status){
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
 }*/

/* GET home page. */
router.get('/', function (req, res, next) {
  var page = (typeof (req.query.page) == 'undefined') ? 1 : req.query.page;
  dbMessage.getMessages(page, function (errs, rows) {
    if (!errs) {
      res.render('admin', {
        title: '后台首页',
        messages: rows,
        message: ''
      });
    }
  });
});

/* GET home page . distinct status: status=1 is no comment; status=2 is comment */
router.get('/:status', function (req, res, next) {
  var status = req.params.status;
  if (!isNaN(status)) {
    getAdminPageByStatus(res, '', status);
  } else {
    next();
  }
});

/* Reply message */
router.post('/1', function (req, res, next) {
  var id = req.body.id;
  var status = 2;
  var reContent = req.body.reContent;
  var reTime = myUtil.getTime(new Date());
  var reUser = myUtil.getIp(req);
  if (reContent) {
    dbMessage.replyMessage(id, reContent, reTime, reUser, status, function (errs, rows) {
      if (!errs) {
        getAdminPageByStatus(res, '回复成功', 1);
      } else {
        res.render('err', {
          message: errs,
          error: errs
        });
      }
    });
  }
});


/*------------------------BEGIN Ajax-----------------------------------*/
/* reply message */
router.post('/reply/:id', function(req,res,next){
  var id = req.params.id;
  var reContent = req.body.reContent;
  var reTime = myUtil.getTime(new Date());
  var reUser = myUtil.getIp(req);
  var status = req.body.status;
  if(reContent && status){
    dbMessage.replyMessage(id,reContent,reTime,reUser,status,function(errs,rows){
      if(!errs){
        res.end('回复成功');
      }else{
        next();
      }
    });
  }
});

/* Delete message */
router.post('/del/:table/:id', function (req, res, next) {
  var id = req.params.id;
  var table = req.params.table;
  if(table && table == 'message'){
    dbMessage.delMessage(id, function (errs, rows) {
      if (!errs) {
        res.end('删除成功');
      } else {
        next();
      }
    });
  }else if(table == 'dept'){
    dbDept.delDept(id,function(errs,rows){
      if(!errs){
        res.send('删除成功');
      }else{
        next();
      }
    });
  }else if(table == 'cates'){
    dbCates.delCate(id, function(errs, rows){
      if(!errs){
        res.send('删除成功');
      }else{
        next();
      }
    });
  }
});

/* bootstrap-table 获取的json数据*/
router.get('/data/:table', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  var table = req.params.table;
  if (table == 'message') {
    var offset = +req.query.offset || 0,
        limit = +req.query.limit || 20,
        search = req.query.search,
        name = req.query.sort || 'id',
        order = req.query.order || 'desc',
        max = offset + limit,
        rows = [],
        result = {
          total: +req.query.total || 800,
          rows: []
        };
    dbMessage.getMessagesByOffset(offset, limit, order, name, function (errs1, rows1) {
      dbMessage.getCountFromMessage(function (errs2, rows2) {
        console.log(errs1 + '---------------' + errs2);
        if (!errs1 && !errs2) {
          rows = rows1;
          result.total = rows2[0].count;
/*          // 从数据库取出数据后进行筛选
          if (search) {
            rows = rows.filter(function(item) {
              return item.name.indexOf(search) !== -1;
            });
          }*/

/*          if (['id', 'status', 'category'].indexOf(name) !== -1) {
            rows = rows.sort(function(a, b) {
              var c = a[name],
                  d = b[name];

              if (name === 'price') {
                c = +c.substring(1);
                d = +d.substring(1);
              }
              if (c < d) {
                return order === 'asc' ? -1 : 1;
              }
              if (c > d) {
                return order === 'asc' ? 1 : -1;
              }
              return 0;
            });
          }*/
          console.log('max=' + max + ', offset= ' + offset + ', total=' + result.total + ', rows.length= ' + rows.length );
          for (var i = 0; i < rows.length; i++) {
            result.rows.push(rows[i]);
          }
          res.json(result);
        }
      });
    });
  } else if (table == 'dept') {

  } else if (table == 'cates') {

  }
});

/*------------------------END Ajax-----------------------------------*/


module.exports = router;
