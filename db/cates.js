/**
 * Created by pengloo53 on 2016/10/30.
 */

var connect = require('./connect.js');

// 得到所有的category
exports.getAllCates = function(callback){
  var client = connect.getConn();
  var statement = 'select distinct(category) cate from cates';
  client.query(statement, function(errs,rows,fields){
    callback(errs,rows);
  });
  connect.endConn(client);
};

// 根据category得到所有的key
exports.getkeysByCate = function(cate, callback){
  var client = connect.getConn();
  var statement = 'select * from cates where category = "' + cate +'"';
  client.query(statement, function(errs,rows,fields){
    callback(errs,rows);
  });
  connect.endConn(client);
};

// 更新key的数量
exports.updateNum = function(cate,key,callback){
  var client = connect.getConn();
  var statement = 'update cates set num = num+1 where key = "' + key + '" and cate = ' + cate;
  client.query(statement, function(errs,rows,fields){
    callback(errs,rows);
  });
  connect.endConn(client);
};