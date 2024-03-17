const express = require('express');
const { registerDto, loginDto } = require('../validations/auth.validation');
const validateRequest = require('../middlewares/validation.middleware');
const { register, login, refreshToken } = require('../controllers/auth.controller');
const router = express.Router();

const app = express()

// Routes
/**
 * @swagger
 * /register:
 *  post:
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.post('/register', validateRequest(registerDto), register)

/**
* @swagger
* /auth/login:
*   post:
*     tags:
*       - Login
*     description: Login into system
*     produces:
*       - application/json
*     parameters:
*       - username: User
*         description: The username of user
*         in: body
*         required: true
*       - password: password
*         description: Password of user
*         in: body
*         required: true
*
*     responses:
*       200:
*         description: Successfully login
*/
router.post('/login', validateRequest(loginDto), login)

router.get('/token/refresh', refreshToken)
module.exports = router;
