const express = require('express');
require('dotenv').config();

const { User } = require('../models/userModel');
const {
   registerUser
} = require('../controllers/userControllers')




//**************** variables ****************//
const router = express.Router();



//**************** user routes ****************//
router.route('/register').post(registerUser)



module.exports = router