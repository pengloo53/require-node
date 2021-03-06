var connect = require('./connect.js');

/* ---------------------BEGIN table dept -----------------*/
// 添加一条dept
exports.addDept = function (plant, deptname, callback) {
  var conn = connect.getConn();
  var statement = 'insert into dept (plant, deptname) values ("'
      + plant + '","'
      + deptname + '")';
  conn.query(statement, function (errs, rows, fields) {
    callback(errs, rows);
  });
  connect.endConn(conn);
};

// 删除dept
exports.delDept = function (id, callback) {
  var conn = connect.getConn();
  var statement = 'delete from dept where id = ' + id;
  conn.query(statement, function (errs, rows, fields) {
    callback(errs, rows);
  });
  connect.endConn(conn);
};

// 根据Plant查找所有的deptname
exports.findAllDepts = function (plant, callback) {
  var conn = connect.getConn();
  var statement = 'select * from dept where plant = "' + plant + '" order by id desc';
  conn.query(statement, function (errs, rows, fields) {
    callback(errs, rows);
  });
  connect.endConn(conn);
};

/* ---------------------END table dept -------------------*/