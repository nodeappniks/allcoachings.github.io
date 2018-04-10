var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";



router.post('/', function(req, res, next) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("sample");
        var query = {section: "New Batch"};
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