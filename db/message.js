var connect = require('./connect.js');
var config = require('./config.js');

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
    console.log("errs: " + errs + '\nrows: ' + rows + '\nfields: ' + fields);
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
/*exports.getAllMessages = function (callback) {
  var conn = connect.getConn();
  var statement = 'select * from message order by id desc';
  conn.query(statement, function (errs, rows, fields) {
    callback(errs, rows);
  });
  connect.endConn(conn);
};*/

// 根据id获取message
exports.getMessageById = function (id, callback) {
  var conn = connect.getConn();
  var statement = 'select * from message where id=' + id;
  conn.query(statement, function (errs, rows, fields) {
    callback(errs, rows);
  });
  connect.endConn(conn);
};

// 分页获取所有message
exports.getMessages = function (page, callback) {
  var conn = connect.getConn();
  var statement = 'select * from message order by id desc limit ' + (page-1)*config.pageCount + ',' + config.pageCount;
  conn.query(statement, function (errs, rows, fields) {
    callback(errs, rows);
  });
  connect.endConn(conn);
};

// 按偏移和总数获取message
exports.getMessagesByOffset = function(offset, limit, order,name, callback){
  var conn = connect.getConn();
  var statement = 'select * from (select * from message order by id desc limit ' + offset + ',' + limit + ') a order by a.' + name + ' ' + order;
  conn.query(statement, function(errs,rows,fields){
    callback(errs,rows);
  });
  connect.endConn(conn);
};

// 按状态分页获取Message信息
exports.getMessagesByStatus = function(page,status,callback){
  var conn = connect.getConn();
  var statement = 'select * from message where status=' + status + ' order by id desc limit ' + (page-1)*config.pageCount + ',' + config.pageCount;
  conn.query(statement, function(errs,rows,fields){
    callback(errs,rows);
  });
  connect.endConn(conn);
};

// 得到message的数量
exports.getCountFromMessage = function(callback){
  var conn = connect.getConn();
  var statement = 'select count(*) count from message';
  conn.query(statement, function(errs,rows,fields){
    callback(errs,rows);
  });
  connect.endConn(conn);
};

// 得到分类message的数量
exports.getCountFromMessageByCate = function(cate, callback){
  var conn = connect.getConn();
  var statement = 'select count(*) count from message where category="' + cate + '"';
  conn.query(statement, function(errs,rows,fields){
    callback(errs,rows);
  });
  connect.endConn(conn);
};

// 按类别分页获取Message信息
exports.getMessagesByCate = function(page,cate,callback){
  var conn = connect.getConn();
  var statement = 'select * from message where category="' + cate + '" order by id desc limit ' + (page-1)*config.pageCount + ',' + config.pageCount;
  conn.query(statement, function(errs,rows,fields){
    callback(errs,rows);
  });
  connect.endConn(conn);
};
/* ----------------END message------------------------- */
