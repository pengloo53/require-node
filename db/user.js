/**
 * Created by 118663 on 2016/12/15.
 */
var connect = require('./connect.js');

// 验证用户
exports.valideUser = function(username, callback){
  var conn = connect.getConn();
  var statement = 'select * from user where username = "' + username +'"';
  conn.query(statement, function(errs, rows, fields){
    callback(errs,rows);
  });
  connect.endConn(conn);
};