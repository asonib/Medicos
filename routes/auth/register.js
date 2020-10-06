const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar');
const normalize = require('normalize-url');
const jwt = require('jsonwebtoken');
require('dotenv').config()

require('../../models/Users')
const Users = mongoose.model('user');

/*
    method: POST
    visibility: public
    response: token for autherization
*/
router.post('/auth/register', [
    check('name', 'Name is required'),
    check('username', 'Username is required').isString(),
    check('phone', 'Phone Number is required').isLength({min: 10}),
    check('email', 'Email is required').isEmail(),
    check('address', 'Address is required').isString(),
    // password must be at least 5 chars long
    check('password', 'Password is required').isLength({ min: 5 }),
    check('confirm', 'Confirm Password').isString()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const check_email = await Users.findOne({email: req.body.email})
    if(check_email){
        return res.status(422).json({errors: [{'msg': 'Email Already Exist'}]})
    }

    const check_phone = await Users.findOne({phone: req.body.phone})
    if(check_phone){
        return res.status(422).json({errors: [{'msg': 'Phone Number Already Exist'}]})
    }

    const check_uname = await Users.findOne({username: req.body.username})
    if(check_uname){
        return res.status(422).json({errors: [{'msg': 'Username Taken'}]})
    }

    if(req.body.password != req.body.confirm){
        return res.json({errors: [{'msg': 'Passwords Do Not Match'}]})
    }


    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const avatar = normalize(gravatar.url(req.body.email, { s: "200", d: "mm", r: "pg" }), { forceHttps: true });
    
    const new_user = new Users({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: hash,
        address: req.body.address,
        phone: req.body.phone,
        avatar: avatar
    })
    await new_user.save()
    try {
        const payload = {
            id: new_user._id
        }
        jwt.sign(payload, process.env.JWT_SECRETKEY, { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            return res.json({ token: token });
        });
    } catch (err) {
        return res.json({errors: [{'msg': 'error getting user'}]})
    }
})

module.exports = router;