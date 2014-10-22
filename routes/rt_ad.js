var express = require('express');
var router = express.Router();

var client = require('./includes/client');
var exec = require('child_process').exec;

/* GET home page. */
router.get('/', function(req, res) {
  res.render('ad/index', { title: 'Admin-Wrapper' });
});

router.get('/client', function (req, res) {
  var info = new Object
  info.ip = client.ip(req);
  res.send(info);
});

router.get('/adcomputer', function (req, res) {
  var cmd = ".\\routes\\ps\\adcomputer.ps1";
  if (req.query.hostname) {
    cmd+=" -hostname "+req.query.hostname;
  }
  exec("powershell.exe "+cmd, function (err, stdout, stderr) {
    res.send(stdout);
  })
});


module.exports = router;
