var express = require('express');
const validateRequest = require('../middlewares/validation.middleware');
const { locationDto } = require('../validations/auth.validation');
const { create, update } = require('../controllers/location.controller');
const { isLogin } = require('../middlewares/auth.middleware');
var router = express.Router();

router.post('/', isLogin, validateRequest(locationDto), create)
router.put('/:id', isLogin, update)
module.exports = router;
 