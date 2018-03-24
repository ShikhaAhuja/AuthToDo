var express = require('express');
var router = express.Router();
var tokenVerify = require('./jwtVerfiy');

var registrationLogin = require('./registrationLogin');
var insert = require('./todo');

router.post('/register',registrationLogin.registration);
router.post('/login', registrationLogin.login);
router.post('/insert', tokenVerify , insert.insertTask);

module.exports = router;