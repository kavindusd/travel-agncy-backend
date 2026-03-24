const express = require('express');
const router=express.Router();
const {verifyToken, checkSuperAdmin} = require('../Middlewares/AuthMiddleware');
const {register, login,getAgentContactByRole} = require('../Controllers/UserController');

//  /api/admins/login
router.post('/login',login);



//  /api/admins/register
router.post('/register',verifyToken,checkSuperAdmin, register);

router.get('/contact/:role', getAgentContactByRole);

module.exports = router;
