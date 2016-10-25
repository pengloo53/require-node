var connect = require('./connect.js');

/* ---------------------BEGIN table dept -----------------*/
// 添加一条dept
exports.addDept = function(deptname,callback){
  var conn = connect.getConn();
  var statement = 'insert into dept (deptname) values ("' + deptname + '")';
  conn.query(statement, function(errs,rows,fields){
    callback(errs,rows);
  });
  connect.endConn(conn);
};

// 删除dept
exports.delDept = function(id, callback){
  var conn = connect.getConn();
  var statement = 'delete from dept where id ' + id;
  conn.query(statement, function (errs,rows,fields){
    callback(errs,rows);
  });
  connect.endConn(conn);
};

exports.findAllDepts = function (callback){
  var conn = connect.getConn();
  var statement = 'select * from dept';
  conn.query(statement, function(errs,rows,fields){
    callback(errs,rows);
  });
  connect.endConn(conn);
};

/* ---------------------END table dept -------------------*/