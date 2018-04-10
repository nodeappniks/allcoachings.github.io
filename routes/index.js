var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  var MongoClient = require("mongodb").MongoClient;
  var url = "mongodb://localhost:27017/";
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("sample");
    
    dbo
      .collection("coaching")
      .find({}).toArray(function(err, result) {
        // if (err) throw err;
        if (result != null) {
          // sess = req.session;
          // sess.username = req.body.username;
          
          res.send(result);
        } else {
          res.send({"status":"unsuccess"});
        }
        
        db.close();
      });
  });
});

module.exports = router;
