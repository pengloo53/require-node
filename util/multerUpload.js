var multer = require('multer');
var myUtil = require('./myUtil.js');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd()+'/public/images/uploads/');
  },
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
});

var upload = multer({storage: storage});

module.exports = upload;