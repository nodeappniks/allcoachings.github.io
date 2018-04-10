var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  sess = req.session;
    if(sess.userName){
      res.render('dashboard', { title: 'Express' });
    }else{
      res.render('admin', { title: 'Express' });
    }
  
});

module.exports = router;
