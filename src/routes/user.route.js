var express = require('express');
const validateRequest = require('../middlewares/validation.middleware');

const { isLogin } = require('../middlewares/auth.middleware');
const { getLocation } = require('../controllers/user.controller');
var router = express.Router();

router.get('/locations', isLogin, getLocation)


module.exports = router;
 