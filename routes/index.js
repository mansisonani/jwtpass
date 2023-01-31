var express = require('express');
var router = express.Router();
const usercontroller = require('../controllers/user')


router.post('/signup', usercontroller.Signup);

router.post('/signin', usercontroller.Signin);

router.get('/show', usercontroller.Secure , usercontroller.Show);

module.exports = router;
