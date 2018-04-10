var express = require("express");
var router = express.Router();
var bodyParser = require('body-parser');

router.post("/", function(req, res, next) {
    var MongoClient = require("mongodb").MongoClient;
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("sample");
    var raqtingDetails = {
        rateName: req.body.rateName,
        rateComment: req.body.rateComment,
        rating: req.body.rating,
        coachingId: req.body.coachingId
    };
    dbo
      .collection("rating")
      .insertOne(raqtingDetails, function(err, res) {
        if (err) throw err;
        db.close();
        
      });
    });
    res.send("success");
});

module.exports = router;