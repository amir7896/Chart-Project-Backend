const express = require('express');
const passport = require('passport');
const jwt      = require('jsonwebtoken');
const router = express.Router();
const User  = require('../models/user');







// ==================
// Register New User
// ==================


router.post('/register', async(req, res) => {
    try{
        const {email,username, password} = req.body;
        const user = new User ({email, username});
        const registerUser = await User.register(user, password);
        // For JWT Token
        let payload = { subject: registerUser._id};
        let token   = jwt.sign(payload, 'secretkey');
        return res.status(200).json({code: 200, message: 'User Register Successfully.', token: token , user:registerUser});
        
    }catch(e){
        return res.status(440).json({code: 400, message: e.message});
    }

});
// ==============
// Get All Users
// =============
router.get('/users', async(req, res) => {
    const users = await User.find({});
    return res.json(users);
});

// ===========
// Login User
// ===========

router.post('/login', passport.authenticate('local', {failureFlash:true, failureRedirect: '/'}) ,async(req ,res) => {
   try{
    const { email, username } = req.body;
    const user = await User.findOne({ username });

    // JWT TOKEN
    let payload = {subject: user._id};
    let token   = jwt.sign(payload, 'secretkey');
    return res.status(200).json({code:200,  message: 'You Are Log In Successfully', user:user, token: token});
   }catch(e){
    return res.status(440).json({code: 400, message: e.message});
   }
    
})
module.exports = router;

