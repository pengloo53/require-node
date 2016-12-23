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
  console.log('............................OPEN a connection, has '+ connCount + ' connection.');
  return mysql.createConnection(options);
};

exports.endConn = function(conn){
  conn.end(function(err){
    if(!err){
      connCount --;
      console.log('.........................CLOSE a connection, has '+ connCount + ' connection.');
    }
  });
};