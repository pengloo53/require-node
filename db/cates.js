/**
 * Created by pengloo53 on 2016/10/30.
 */

var connect = require('./connect.js');

exports.getAll = function(callback){
  var client = connect.getConn();
  var statement = 'select * from cates order by id desc';
  client.query(statement, function(errs,rows,fields){
    callback(errs,rows);
  });
  connect.endConn(client);
};

// 得到所有的category
exports.getAllCates = function(callback){
  var client = connect.getConn();
  var statement = 'select distinct(category) cate from cates';
  client.query(statement, function(errs,rows,fields){
    callback(errs,rows);
  });
  connect.endConn(client);
};

// 根据category得到所有的key以及对应num
exports.getkeysByCate = function(cate, callback){
  var client = connect.getConn();
  var statement = 'select * from cates where category = "' + cate +'"';
  client.query(statement, function(errs,rows,fields){
    callback(errs,rows);
  });
  connect.endConn(client);
};

// 更新key的数量
exports.updateNum = function(category,keyname,callback){
  var client = connect.getConn();
  var statement = 'update cates set num = num+1 where key = "' + key + '" and cate = ' + cate;
  client.query(statement, function(errs,rows,fields){
    callback(errs,rows);
  });
  connect.endConn(client);
};

// 新增
exports.addCate = function(category,keyname,callback){
  var client = connect.getConn();
  var num = 0;  // 初始数量为0
  var statement = 'insert into cates (category,keyname,num) values ("' +
          category + '","' +
          keyname + '",' +
          num + ')';
  client.query(statement, function(errs,rows,fields){
    callback(errs,rows);
  });
  connect.endConn(client);
};

// 删除
exports.delCate = function (id,callback){
  var client = connect.getConn();
  var statement = 'delete from cates where id = '  + id;
  client.query(statement, function(errs,rows,fields){
    callback(errs,rows);
  });
  connect.endConn(client);
};