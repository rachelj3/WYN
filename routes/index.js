var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("Getting index!!");
  res.render('index', { title: 'Express' });
});

router.get('*.ejs', function(req, res, next) {
  console.log("getting ejs");
  // splitPath = ;
  // filename = req.path.split("/")[-1];
  // console.log(splitPath);
  console.log(req.path.split("/").at(-1));
  res.render(req.path.split("/").at(-1));
});

module.exports = router;
