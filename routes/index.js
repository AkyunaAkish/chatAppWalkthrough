var express = require('express');
var router = express.Router();







//Keep at the bottom of your index.js routes file always (right about the module.exports line)
router.get('*', function(req, res, next) {
  res.sendFile('index.html', {
    root: __dirname + '/../public/'
  });
});

module.exports = router;
