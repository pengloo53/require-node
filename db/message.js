var connect = require('./connect.js');


/* ----------------BEGIN message------------------------- */
// 添加message
exports.addMessage = function (category, keyname, title, content, dept, time, user, status, image, callback) {
  var conn = connect.getConn();
  var statement = 'insert into message (category,keyname,title,content,dept,time,user,status,image) values (' + '"'
      + category + '","'
      + keyname + '","'
      + title + '","'
      + content + '","'
      + dept + '","'
      + time + '","'
      + user + '",'
      + status + ',"'
      + image + '")';
  conn.query(statement, function (errs, rows, fields) {
    callback(errs, rows);
  });
  connect.endConn(conn);
};

// 删除message
exports.delMessage = function (id, callback) {
  var conn = connect.getConn();
  var statement = 'delete from message where id = ' + id;
  conn.query(statement, function (errs, rows, fields) {
    console.log("errs: " + errs + '\trows: ' + rows + '\tfields: ' + fields);
    callback(errs, rows);
  });
  connect.endConn(conn);
};

// 修改message信息
exports.editMessage = function (id, title, content, dept, reContent, reTime, reUser, status, callback) {
  var conn = connect.getConn();
  var statement = 'update message set title="'
      + title + '",content="'
      + content + '",dept="'
      + dept + '"reContent="'
      + reContent + '",reTime="'
      + reTime + '",reUser="'
      + reUser + '",status='
      + status + ' where id=' + id;
  conn.query(statement, function (errs, rows, fields) {
    console.log("errs: " + errs + '\trows: ' + rows + '\tfields: ' + fields);
    callback(errs, rows);
  });
  connect.endConn(conn);
};

// 回复message
exports.replyMessage = function (id, reContent, reTime, reUser, status, callback) {
  var conn = connect.getConn();
  var statement = 'update message set reContent="'
      + reContent + '",reTime="'
      + reTime + '",reUser="'
      + reUser + '",status='
      + status + ' where id=' + id;
  conn.query(statement, function (errs, rows, fields) {
    callback(errs, rows);
  });
  connect.endConn(conn);
};

// 查询所有message
exports.getAllMessages = function (callback) {
  var conn = connect.getConn();
  var statement = 'select * from message order by id desc';
  conn.query(statement, function (errs, rows, fields) {
    callback(errs, rows);
  });
  connect.endConn(conn);
};

// 根据id获取message
exports.getMessageById = function (id, callback) {
  var conn = connect.getConn();
  var statement = 'select * from message where id=' + id;
  conn.query(statement, function (errs, rows, fields) {
    callback(errs, rows);
  });
  connect.endConn(conn);
};

// 获取status的所有message
exports.getMessagesByStatus = function (status, callback) {
  var conn = connect.getConn();
  var statement = 'select * from message where status=' + status + ' order by id desc';
  conn.query(statement, function (errs, rows, fields) {
    callback(errs, rows);
  });
  connect.endConn(conn);
};
/* ----------------END message------------------------- */