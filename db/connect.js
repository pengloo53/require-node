var mysql = require('mysql');

var options = {
  host: 'localhost',
  user: 'lupeng',
  password: '080910',
  database: 'requirement'
};

var connCount = 0;

exports.getConn = function(){
  connCount ++;
  return mysql.createConnection(options);
};

exports.endConn = function(conn){
  conn.end(function(err){
    if(!err){
      connCount --;
      console.log('........................................................END a connection, has '+ connCount + ' connection.');
    }
  });
};