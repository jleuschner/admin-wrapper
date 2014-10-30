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
  var out = new Object;
  if (req.query.hostname) {
    cmd += " -hostname " + req.query.hostname + "*";
  }
  exec("powershell.exe " + cmd, { maxBuffer: 400 * 1024 }, function (err, stdout, stderr) {
    out.err = err;
    var xout = JSON.parse(stdout);
    out.stdout = (Array.isArray(xout) ? xout : Array(xout));
    out.stderr = stderr;
    res.setHeader('Content-Type', 'application/json');
    res.send(out);
  })
});


module.exports = router;
