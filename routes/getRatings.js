var express = require("express");
var router = express.Router();
var bodyParser = require('body-parser');
/* GET users listing. */
router.post("/", function(req, res, next) {
  var MongoClient = require("mongodb").MongoClient;
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("sample");
    dbo
      .collection("rating")
      .find({ coachingId: req.body.coachingId }).toArray(function(err, result) {
        if (err) throw err;
        
        db.close();
        res.send(result);
      });
  });

  
});

module.exports = router;
