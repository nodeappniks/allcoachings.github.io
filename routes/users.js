var express = require("express");
var router = express.Router();
var bodyParser = require('body-parser');
/* GET users listing. */
router.post("/", function(req, res, next) {
  var MongoClient = require("mongodb").MongoClient;
  // var url = "mongodb://localhost:27017/";
  var url = "mongodb://nitish:123456@ds063536.mlab.com:63536/";
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("sample");
    var myobj = { name: "Company Inc", address: "Highway 37" };
    dbo
      .collection("user")
      .findOne({ username: req.body.username, password: req.body.password }, function(err, result) {
        // if (err) throw err;
        if (result != null) {
          sess = req.session;
          sess.userName = req.body.username;
          
          res.send({"status":"success"});
        } else {
          res.send({"status":"unsuccess"});
        }
        
        db.close();
      });
  });

  //res.send("respond with a resource");
});

module.exports = router;
