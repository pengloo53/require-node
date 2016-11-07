var express = require('express');
var dbDept = require('../db/dept.js');
var dbMessage = require('../db/message.js');
var dbCates = require('../db/cates.js');
var myUtil = require('../util/myUtil.js');
var router = express.Router();
var util = require('util');
var upload = require('../util/multerUpload.js');
var statusCovert = require('../util/statusCovert.js');

/* 传输消息参数，获取add页面 */
function getAddPage(res, message) {
  dbDept.findAllDepts(function (errs1, rows1) {
    dbCates.getAllCates(function (errs2, rows2) {
      dbCates.getkeysByCate('IT', function (errs3, rows3) {
        if (!errs1 && !errs2 && !errs3) {
          res.render('admin/add', {
            title: '添加需求',
            message: message,
            depts: rows1,
            cates: rows2,
            keys: rows3
          });
        } else {
          next();
        }
      });
    });
  });
}

/* 传输消息参数，获取首页 */
/*function getIndexPage(res, message, pageCount) {
 dbMessage.getMessagesByPage(pageCount, function (errs, rows) {
 dbCates.getAllCates(function (errs2, rows2) {
 if (!errs && !errs2) {
 res.render('index', {
 title: '需求首页',
 message: message,
 cates: rows2,
 messages: rows
 });
 } else {
 next();
 }
 });
 });
 }*/

/* ----------------- BEGIN Ajax ----------------------*/
/* GET keys by cate use ajax*/
router.get('/ajax/:cate', function (req, res, next) {
  var cate = req.params.cate;
  dbCates.getkeysByCate(cate, function (errs, rows) {
    res.render('ajax/add_keys', {
      cate: cate,
      keys: rows
    });
  });
});

/* GET Home by status */
router.get('/status/:status', function (req, res, next) {
  var status = req.params.status;
  var page = req.query.page ? req.query.page : 0;
  dbMessage.getMessagesByStatus(page, status, function (errs, rows) {
    if (!errs) {
      var subtitle = statusCovert.fromIdToComment(status * 1);
      console.log("---------------------------------2" + subtitle);
      res.render('index/index-ajax-status', {
        subtitle: subtitle,
        messages: rows
      });
    } else {
      next();
    }
  });
});

/* GET Home by category */
router.get('/cate/:cate', function (req, res, next) {
  var cate = req.params.cate;
  var page = req.query.page ? req.query.page : 0;
  dbMessage.getMessagesByCate(page, cate, function (errs, rows) {
    if (!errs) {
      res.render('index/index-ajax-cate', {
        category: cate,
        messages: rows
      });
    } else {
      next();
    }
  });
});

/* ----------------- END Ajax ----------------------*/

/* GET home page. */
router.get('/', function (req, res, next) {
  var page = req.query.page ? req.query.page : 0;
  dbMessage.getMessages(page, function (errs, rows) {
    dbCates.getAllCates(function (errs2, rows2) {
      if (!errs && !errs2) {
        res.render('index', {
          title: '需求首页',
          cates: rows2,
          messages: rows
        });
      } else {
        next();
      }
    });
  });
});

/* GET add page. */
router.get('/add', function (req, res, next) {
  getAddPage(res, '');
});

/*  add requirement. */
router.post('/add', upload.array('image'), function (req, res, next) {
  console.log(util.inspect(req.files));
  console.log(util.inspect(req.body));
  var category = req.body.cate;
  var keyname = req.body.key;
  var title = req.body.title.trim();
  var content = req.body.content.toString().trim();
  var dept = req.body.dept;
  var image = [];
  for (var i = 0; i < req.files.length; i++) {
    image.push(req.files[i].filename);
  }
  var user = myUtil.getIp(req);
  var time = myUtil.getTime(new Date());
  var status = 1;
  console.log("..................................add message: %s,%s,%s,%s,%s,%s,%d.", category, keyname, content, dept, user, time, status);
  if (keyname && title && dept) {
    dbMessage.addMessage(category, keyname, title, content, dept, time, user, status, image, function (errs, rows) {
      if (!errs) {
        res.redirect('index');
      } else {
        res.render('err', {
          message: errs,
          error: errs
        });
      }
    });
  } else {
    getAddPage(res, '请填写完整');
  }
});

module.exports = router;
