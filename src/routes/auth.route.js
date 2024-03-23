const express = require('express');
const { registerDto, loginDto, forgotPasswordDto, newPasswordSchema } = require('../validations/auth.validation');
const validateRequest = require('../middlewares/validation.middleware');
const { register, login, refreshToken, forgotPassword, newPassword } = require('../controllers/auth.controller');
const router = express.Router();

const app = express()


router.post('/register', validateRequest(registerDto), register)

router.post('/login', validateRequest(loginDto), login)

router.post('/password/forgot', validateRequest(forgotPasswordDto), forgotPassword)

router.post('/password/change', validateRequest(newPasswordSchema), newPassword)

router.get('/token/refresh', refreshToken)
module.exports = router;
