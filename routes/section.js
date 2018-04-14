var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";
var url = "mongodb://nitish:nitish@123@mongodb/";
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('section', { title: 'Express' });
});

router.post('/', function(req, res, next) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("coaching");
        var query = {section: req.body.id};
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