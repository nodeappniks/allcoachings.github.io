var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('details', { title: 'Express' });
});

router.post('/', function(req, res, next) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("sample");
        var query = {};
        dbo.collection("coaching").find(query).toArray(function(err, result) {
          if (err) throw err;
          // console.log(result.name);
          db.close();
          res.send(result);
        });
      });
    // res.render('details', { title: 'Express' });
});

module.exports = router;