const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.post('/register',userController.register);
router.post('/login',userController.login);
router.get('/profile',userController.userProfile);

module.exports = router;