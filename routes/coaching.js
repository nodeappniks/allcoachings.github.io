var express = require('express');
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

/* GET home page. */
router.post('/', function(req, res, next) {
    sess = req.session;
    if(sess.userName){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            // var timeArr = req.body.time;
            var newData = {
                name: req.body.name,
                director: req.body.director,
                mobile: req.body.mobile,
                mail: req.body.mail,
                section: req.body.section,
                address: req.body.address,
                teacher: req.body.teacher,
                web: req.body.web,
                tag: req.body.tag,
                time: JSON.parse(req.body.time)
            };
            var dbo = db.db("sample");
            
            dbo
              .collection("coaching")
              .insertOne(newData, function(err, res) {
                if (err) throw err;
                db.close();
                
              });
          });
          res.send("saved");
    }else{
        res.redirect('/admin');
    }
    
      // res.end("saved");
});

module.exports = router;
