var express = require('express');
var router = express.Router();
var login = require('./login')

router.all('/', [login]);

module.exports = router;
